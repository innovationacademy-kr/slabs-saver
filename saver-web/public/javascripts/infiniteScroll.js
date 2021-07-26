var INITIAL_PAGE = 0; // 처음 렌더하는 아티클
var ADD_PAGE = 3;
var DEFAULT_HEIGHT = $(window).height() + 10;
var page = INITIAL_PAGE;
var isUsed = false;
var articleList = document.querySelector('.article-list');

import KaKaoShare from './totalShare.js';

const getPage = () => {
  $.ajax({
    url: `/moreArticles?page=${page}`,
    type: 'get',
    success: function (articles) {
      articles = JSON.parse(articles);
      articles.map(function (article) {
        articleList.insertAdjacentHTML('beforeend', makeTemplate(article));
        const item = document.getElementById(`share-button_${article.id}`);
        article.path = `articles/detail/${article.id}`
        if (item) KaKaoShare(item.id, article);
      });

      isUsed = false;
      page += ADD_PAGE;
    },
    error: function (err) {},
  });
};

//?계속 요청 보내는데??
getPage();
$(window).scroll(function () {
  const scrollPosition = $(window).scrollTop() + DEFAULT_HEIGHT;
  const pageHeight = $(document).height() - $(window).height();

  if (scrollPosition > pageHeight && !isUsed) {
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
      ${article.Author.name}/${article.publishedAt}
    </p>
  </div>
  <p class="article__title ft-title">
    ${article.headline}
  </p>
  <img class="article__img" src=${article.image}>
  <p class="article__imgtext ft-detail">
    ${article.imageDesc}(${article.imageFrom})
  </p>
  <div id="editor_briefing_0${article.id}" class="article__briefing ft-main">
  ${unescape(article.briefing)}
  </div>
  <div id="editor_paragraphs_0${article.id}" class="article__paragraphs hide ft-main">
  ${unescape(article.paragraphs)}
  </div>
  <div class="article__control">
    <div data-id="${article.id}" class="article__control__more-button">
      <div class="article__control__more-button__img"></div>
    </div>
    <div class="article__control__right-buttons">
      <button class="article__control__right-buttons__share-button" id="share-button_${
        article.id
      }"></button>
      <button class="article__control__right-buttons__bookmark-button"></button>
    </div>
  </div>
</div>
`;
}
