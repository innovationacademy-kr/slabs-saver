var INITIAL_PAGE = 0; // 처음 렌더하는 아티클
var ADD_PAGE = 3;
var DEFAULT_HEIGHT = $(window).height() + 10;
var page = INITIAL_PAGE;
var isUsed = false;
var articleSearchList = document.querySelector('#article-search-list');
var searchNoting = document.querySelector('.searchNoting');
var searchInput = document.querySelector('#searchWord');
 let wordsData;
 
if (searchInput.value.indexOf(" ") === -1){
	wordsData = searchInput.value.split();
} else {
	wordsData = searchInput.value.split(" ");
	wordsData.push(searchInput.value);
}
console.log(wordsData)

const getSearchPage = (wordsData) => {
  $.ajax({
    url: `/moreSearchArticles?page=${page}`,
    type: 'post',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(wordsData),
    success: function (articles) {

      if (articles.length === 0){
        $('#searchmain').hide();
        $('#searchZero').show();
        searchNoting.insertAdjacentHTML('beforeend', makeNoSearch());
      }
        articles.map(function (article) {
        articleSearchList.insertAdjacentHTML('beforeend', makeTemplate(article));
        fixVidieo(article);
        const item = document.getElementById(`kakao_share_${article.id}`);
        article.path = `articles/detail/${article.id}`;
        if (item) KaKaoShare(item.id, article);
        selectBookmarkClass(article.id, `btn_bookmark-${article.id}`);
      });
      isUsed = false;
      page += ADD_PAGE;
    },
    error: function (err) {},
  });
};

//검색기능 관련 무한 스크롤 요청
getSearchPage(wordsData);

if (articles.length != 0){
  $(window).scroll(function () {
    const scrollPosition = $(window).scrollTop() + DEFAULT_HEIGHT;
    const pageHeight = $(document).height() - $(window).height();
    if (scrollPosition > pageHeight && !isUsed) {
      isUsed = true;
      getSearchPage(wordsData);
    }
  });
};

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

function makeNoSearch(){
  //검색 결과가 없을 시 메세지 추가
  return `
  <div class="section-div">
		<h3 class="section-div__title">Search Result</h3>
	</div>
  <div class="section ice-blue-two">
  <div class="section__col1">
    <div class="section__col1__title my">saver</div>
    <div style="height: 51px;">   
    <div class="logo-small-blue"></div>
    </div>
  </div>
  <div class="section__col2">
    <p class="section__col2__text text-login">
      검색 결과가 없습니다.<br>
    </p>
  </div>
</div>				
`;
}


function makeTemplate(article) {
  //추가되는 카드들
  return `<div class="article">
  <div class="article__top">
    <div class="icon-${article.category}-black"></div>
    <p class="article__top__text ft-detail">
      ${article.Author.name}/${article.publishedAt} </br>${article.Author.email}
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
