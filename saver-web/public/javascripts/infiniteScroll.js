var INITIAL_PAGE = 0; // 처음 렌더하는 아티클
var ADD_PAGE = 3;
var DEFAULT_HEIGHT = $(window).height() + 10;
var page = INITIAL_PAGE;
var isUsed = false;
var articleList = document.querySelector('#article-list');
var articleCategoryList = document.querySelector('#article-category-list');
var articleChoice = document.querySelector('.article-choice');
const token = localStorage['jwtToken'];

const getAMPMArticle = () => {
  if (page === INITIAL_PAGE){
    axios({
      method: 'get',
      url: '/today/ampm7',
    })
    .then((res) => {
      const article = res.data.article;
      articleList.insertAdjacentHTML('beforebegin', makeTemplate(article));
      const item = document.getElementById(`kakao_share_${article.id}`);
      article.path = `articles/detail/${article.id}`;
      if (item) KaKaoShare(item.id, article);
      $(`[data-id=${article.id}]`).removeClass().children().remove();
      selectBookmarkClass(article.id, `btn_bookmark-${article.id}`);
    })
    .catch((err) => {
      console.log(err);
    })
}
}

const getPage = () => {
  $.ajax({
    url: `/moreArticles?page=${page}`,
    type: 'get',
    success: function (articles) {
      articles = JSON.parse(articles);
      articles.map(function (article) {
        articleList.insertAdjacentHTML('beforeend', makeTemplate(article));
        fixVidieo(article);
        const item = document.getElementById(`kakao_share_${article.id}`);
        article.path = `articles/detail/${article.id}`;
        if (item) KaKaoShare(item.id, article);
        selectBookmarkClass(article.id, `btn_bookmark-${article.id}`);
      });

      isUsed = false;
      page += ADD_PAGE;
    },
    error: function (err) {
      articleChoice.style.backgroundColor = "#f5f5f5";
    },
  });
};

const getCategoryPage = () => {
  $.ajax({
    url: `/moreCategoryArticles?page=${page}`,
    type: 'get',
    headers: { 'x-access-token': token },
    success: function (articles) {
      if (articles.length === 2) {
        articleChoice.style.backgroundColor = "#f5f5f5";
      } else {
        $("#none-category-list").hide();
        articles = JSON.parse(articles);
        articles.map(function (article) {
          articleCategoryList.insertAdjacentHTML('beforeend', makeTemplate(article));
          const item = document.getElementById(`kakao_share_${article.id}`);
          article.path = `articles/detail/${article.id}`;
          if (item) KaKaoShare(item.id, article);
          selectBookmarkClass(article.id, `btn_bookmark-${article.id}`);
        });

        isUsed = false;
        page += ADD_PAGE;
    }
    },
    error: function (err) {
      console.log(err.responseJSON.message);
      articleChoice.style.backgroundColor = "#f5f5f5";
    },
  });
};

//?계속 요청 보내는데??
getAMPMArticle();
getPage();
$(window).scroll(function () {
  const scrollPosition = $(window).scrollTop() + DEFAULT_HEIGHT;
  const pageHeight = $(document).height() - $(window).height();

  if (scrollPosition > pageHeight && !isUsed) {
    isUsed = true;
    if ($('#article-list').hasClass('article-list') === true) getPage();
    else getCategoryPage();
  }
});

$('#article-category').on( 'click', function() {
  $('#article-all').removeClass('is-checked');
  $('#article-category').addClass('is-checked');
  $('#article-list').removeClass();
  $("#article-list").hide();
  $("#article-category-list").show();
  getCategoryPage();
});

$('#article-all').on( 'click', function() {
  $('#article-category').removeClass('is-checked');
  $('#article-all').addClass('is-checked');
  if ($('#article-list').hasClass('article-list') === false){
    $('#article-list').addClass('article-list');
  }
  $("#article-category-list").hide();
  $("#article-list").show();
  articleChoice.style.backgroundColor = "white";
  getPage();
});


function fixVidieo(article){
  const briefing = document.getElementById(`editor_briefing_0${article.id}`);
  const paragraphs = document.getElementById(`editor_paragraphs_0${article.id}`);
  const briefVi = briefing.querySelector(".note-video-clip");
  const paragVi = paragraphs.querySelector(".note-video-clip");

  briefVi?.removeAttribute("height");
  briefVi?.removeAttribute("width");
  briefVi?.setAttribute("style", "max-width: 100%; width:95vw; height: 53.43vw;");
  paragVi?.removeAttribute("height");
  paragVi?.removeAttribute("width");
  paragVi?.setAttribute("style", "max-width: 100%; width:95vw; height: 53.43vw");
}

function makeTemplate(article) {
  //추가되는 카드들
  return `
  <div id="article_0${article.id}" class="article">
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
    <div id="share-modal-${article.id}" class="share-modal">
      <div class="modal-content">
        <div class="title">
          <span id="share-close-${
            article.id
          }" class="share-close">&times;</span>
          <h3>공유하기</h3>
        </div>
        <br><hr style="border: solid 1px gray;"><br>
        <div class="content">
          <ul class="share-layer-content">
           <li>   <button id="kakao_share_${
             article.id
           }" class="article_kakao_share-button"></button> </li>
           <li>   <button onclick="facebookshare('${document.location.href}articles/detail/${
    article.id
  }')"
            class="article_facebook_share-button"></button></li>
           <li>   <button onclick="urlshare('${document.location.href}articles/detail/${
    article.id
  }')" class="article_url_share-button">url</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="article__control__right-buttons">
      <button onclick="modalFunction(${
        article.id
      })" class="article__control__right-buttons__share-button"></button>
      <button id="btn_bookmark-${article.id}" onclick="clickBookmark(
        ${article.id}, 'btn_bookmark-${article.id}')"
        class="article__control__right-buttons__bookmark-button"></button>
    </div>
  </div>
</div>
`;
}
