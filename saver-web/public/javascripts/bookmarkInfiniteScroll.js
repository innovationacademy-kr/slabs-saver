var DEFAULT_HEIGHT = $(window).height() + 10;
var page = 0;
var isUsed = false;
var bookmarkList = document.querySelector('.bookmark_alarm-page');

const category = {
  전체: 'total',
  경제: 'economy',
  정치: 'politics',
  국제: 'international',
  사회: 'social',
  문화: 'culture',
};

const weekDay = {
  0: '일요일',
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
  6: '토요일',
};

const getBookmark = () => {
  $.ajax({
    url: `/bookmark/article?page=${page}`,
    type: 'get',
    headers: { 'x-access-token': token },
    success: function (bookmarks) {
      bookmarks.bookmark.map(function (bookmark) {
        const article = bookmark.Article;
        const listTemplate = getListTemplate(article);
        fillBookmark(getSectionTemplate(listTemplate, article), article, bookmark.ArticleId);
      });
      isUsed = false;
      page += 1;
    },
    error: function (err) {},
  });
};

getBookmark();

$(window).scroll(function () {
  const scrollPosition = $(window).scrollTop() + DEFAULT_HEIGHT;
  const pageHeight = $(document).height() - $(window).height();

  if (scrollPosition > pageHeight && !isUsed) {
    isUsed = true;
    getBookmark();
  }
});

function getDate(articleDate) {
  var today = new Date();
  var date = articleDate.split('.');
  var uploadDay = new Date(date[0], date[1] - 1, date[2]);

  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  var result = Math.ceil((today.getTime() - uploadDay.getTime()) / (1000 * 3600 * 24));

  switch (result) {
    case 0:
      return '오늘';
    case 1:
      return '어제';
    default:
      if (result < 7) return weekDay[uploadDay.getDay()];
      return articleDate;
  }
}

function getListTemplate(article) {
  var template = document.getElementById(`bookmark-list-${article.date}`);

  if (template) return template;

  bookmarkList.insertAdjacentHTML(
    'beforeend',
    `
    <div class="bookmark-list" id="bookmark-list-${article.date}">
      <div class="bookmark_alarm-title">
        <div class="bookmark_alarm-title-col1">
          <div class="icon-bookmark-black-transparent"></div>
        </div>
        <div class="bookmark_alarm-title-col2">
          <p class="bookmark_alarm-title-col2-text">${getDate(article.date)}</p>
        </div>
      </div>
    </div>
`,
  );
  //날짜부분 추가
  return document.getElementById(`bookmark-list-${article.date}`);
}

function getSectionTemplate(ListTemplate, article) {
  var template = document.getElementById(
    `bookmark_alarm-section-text-${category[article.category]}-${article.date}`,
  );
  if (template) return template;

  ListTemplate.insertAdjacentHTML(
    'beforeend',
    `
  <div class="bookmark_alarm-section white">
    <div class="bookmark_alarm-section-icon">
      <div id class="icon-${category[article.category]}-blue"></div>
    </div>
    <div class="bookmark_alarm-section-text" 
    id="bookmark_alarm-section-text-${category[article.category]}-${article.date}">
    </div>
  </div>

  <div class="bookmark_alarm-section-tap"></div>
`,
  );
  //아이콘 부분 추가
  return document.getElementById(
    `bookmark_alarm-section-text-${category[article.category]}-${article.date}`,
  );
}

function fillBookmark(template, article, articleId) {
  if (template.childNodes.length > 2)
    template.insertAdjacentHTML(
      'beforeend',
      `
      <div class="bookmark_alarm-section-text-line"></div>`,
    );
  template.insertAdjacentHTML(
    'beforeend',
    `
      <div class="bookmark_alarm-section-text-area">
        <a href="articles/detail/${articleId}">
        <p class="bookmark_alarm-section-text-text">${article.headline}</p>
        </a>
      </div>
`,
  );
  //각 북마크 추가
  return;
}
