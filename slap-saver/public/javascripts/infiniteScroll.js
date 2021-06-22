var INITIAL_PAGE = 4;
var ADD_PAGE = 3;
var DEFAULT_HEIGHT = $(window).height() + 10;
var page = INITIAL_PAGE;
var isUsed = false;
var articleList = document.querySelector('.article-list');

$(window).scroll(function () {
  if (
    $(window).scrollTop() + DEFAULT_HEIGHT > $(document).height() - $(window).height() &&
    !isUsed
  ) {
    isUsed = !isUsed;
    $.ajax({
      url: `/moreArticles?page=${page}`,
      type: 'get',
      success: function (articles) {
        articles = JSON.parse(articles);
        articles.map(function (article) {
          articleList.insertAdjacentHTML('beforeend', makeTemplate(article));
          initEditor(article.id, article.briefing)
        });
        isUsed = !isUsed;
        page += ADD_PAGE;
      },
      error: function (err) {
        console.error('error');
      },
    });
  }
});

function makeTemplate(article) {
  //추가되는 카드들
  return `<div class="article">
  <div class="article__top">
    <div class="icon-${article.category}-black"></div>
    <p class="article__top__text ft-detail">
      ${article.Author.name}/${article.updatedAt}
    </p>
  </div>
  <p class="article__title ft-title">
    ${article.headline}
  </p>
  <img class="article__img" src=${article.image}>
  <p class="article__imgtext ft-detail">
    ${article.imageDesc}(${article.imageFrom})
  </p>
  <p id="editorjs_${article.id}" class="article__maintext ft-main">
  </p>
  <div class="article__control">
    <a href=/articles/${article.id} class="article__control__more-button">
      <div class="article__control__more-button__img"></div>
    </a>
    <div class="article__control__right-buttons">
      <button class="article__control__right-buttons__share-button"></button>
      <button class="article__control__right-buttons__bookmark-button"></button>
    </div>
  </div>
</div>
`;
}


function initEditor(id, briefing) {
  const editor = new EditorJS({
    holder: `editorjs_${id}`,
    data: briefing,
    readOnly: true,
    tools: {
      linkTool: {
        class: LinkTool, // ejs파일에서 불러옴
        config: {
          endpoint: '', // 크롤링해오는 기능은 사용하지 않음 (newArticle.ejs에서 css로 버튼 가림)
        }
      },
      list: {
        class: NestedList,
        inlineToolbar: true,
      },
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: '/articles/upload/image', // Your backend file uploader endpoint
            byUrl: '/articles/fetch/image', // Your endpoint that provides uploading by Url
          }
        }
      }
    },
  });
}
