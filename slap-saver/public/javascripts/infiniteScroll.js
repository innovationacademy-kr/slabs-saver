var INITIAL_PAGE = 4;
var ADD_PAGE = 3;
var DEFAULT_HEIGHT = $(window).height() + 10;
var page = INITIAL_PAGE;
var isUsed = false;
var articleList = document.querySelector('.article-list');

$(window).scroll(function() {
  if ($(window).scrollTop() + DEFAULT_HEIGHT > ($(document).height() - $(window).height()) && !isUsed) {
    isUsed = !isUsed;
    $.ajax({
      url:`/moreArticles?page=${page}`,
      type:'get',
      success: function(articles) {
        JSON.parse(articles).map(function(article) {
          return articleList.insertAdjacentHTML('beforeend', makeTemplate(article))
        })
        isUsed = !isUsed;
        page += ADD_PAGE;
      },
      error: function(err) {
        console.error("error");
      }
    });
  }
});

function makeTemplate(article) {
  return `<a class="article-link" href="/articles/${ article.id }" >
  <div class="col">
    <div class="card content">
      <div class="content-header p-2">
        <span class="badge rounded-pill bg-primary mb-1">
          ${ article.category }
        </span>
        <span class="card-title article-title h5">
          ${ article.headline }
        </span>
        </span>
      </div>
      <div class="d-flex align-items-center card-footer p-1">
        <div class="image mr-3">
          <img src="${ article.authorImg }" class="rounded-circle" width="50px" height="50px" />
        </div>
        <small class="text-muted">
          <span class="p-1" style="font-size: 0.8em;">
            "${ article.author }"
          </span>
          <span class="p-1" style="font-size: 0.8em;">
            "${ article.updatedAt }" 작성됨
          </span>
        </small>
      </div>
      <img src="/images/articleImages/${ article.image }" class="card-img-top"/>
      <div class="card-header bg-transparent image-info">
        <span class="p-0">
          <p class="m-0" style="font-size: 0.5rem; line-height: 15px;">
            "${ article.imageDesc }"
          </p>
        </span>
        <span class="p-0" style="font-size: 0.5rem; line-height: 15px;">
          <p class="m-0">
            "${ article.imageFrom }"
          </p>
        </span>
      </div>
      <div class="card-body">
        <p class="card-text">
          "${ article.briefing}"
        </p>
      </div>
      <div class="action-button">
        <span class="action-button__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-share"
            viewBox="0 0 16 16">
            <path
              d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
        </span>
        <span class="action-button__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor"
            class="bi bi-paperclip" viewBox="0 0 16 16">
            <path
              d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</a>`;
}