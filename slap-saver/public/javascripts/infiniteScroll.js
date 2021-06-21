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
        JSON.parse(articles).map(function (article) {
          return articleList.insertAdjacentHTML('beforeend', makeTemplate(article));
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
  <img class="article__img" src=${article.authorImg}>
  <p class="article__imgtext ft-detail">
    ${article.imageDesc}(${article.imageFrom})
  </p>
  <p class="article__maintext ft-main">
    ${article.briefing}
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
