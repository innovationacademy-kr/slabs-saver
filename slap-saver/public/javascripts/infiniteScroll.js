var INITIAL_PAGE = 1;
var ADD_PAGE = 3;
var DEFAULT_HEIGHT = $(window).height() + 10;
var page = INITIAL_PAGE;
var isUsed = false;
var articleList = document.querySelector('.article-list');

const getPage = () => {
	$.ajax({
		url: `/moreArticles?page=${page}`,
		type: 'get',
		success: function (articles) {
			articles = JSON.parse(articles);
			articles.map(function (article) {
				articleList.insertAdjacentHTML('beforeend', makeTemplate(article));
				const { id } = article;
				const briefingEditor = createEditor(`editorjs_briefing_0${id}`, article.briefing)
				const paragraphsEditor = createEditor(`editorjs_paragraphs_0${id}`, article.paragraphs)
			});
			isUsed = false;
			page += ADD_PAGE;
		},
		error: function (err) {
		},
	});
}

getPage();
$(window).scroll(function () {
	if (
		$(window).scrollTop() + DEFAULT_HEIGHT > $(document).height() - $(window).height() &&
		!isUsed
	) {
		isUsed = true;
		getPage();
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
  <div id="editorjs_briefing_0${article.id}" class="article__briefing ft-main">
  </div>
  <div id="editorjs_paragraphs_0${article.id}" class="article__paragraphs close ft-main">
  </div>
  <div class="article__control">
    <div data-id="${article.id}" class="article__control__more-button">
      <div class="article__control__more-button__img"></div>
    </div>
    <div class="article__control__right-buttons">
      <button class="article__control__right-buttons__share-button"></button>
      <button class="article__control__right-buttons__bookmark-button"></button>
    </div>
  </div>
</div>
`;
}


const createEditor = (id, editorContent) => {
	const editor = new EditorJS({
		holder: id,
		data: JSON.parse(editorContent),
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
	return editor;
}
