var DEFAULT_HEIGHT = $(window).height() + 10;
var page = 0;
var isUsed = false;
var bookmarkList = document.querySelector('.bookmark-page');

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
        const item = fillBookmark(
          getSectionTemplate(listTemplate, article),
          article,
          bookmark.ArticleId,
        );
        addEvent(listTemplate, item, bookmark.ArticleId);
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
      <div class="bookmark-title">
        <div class="bookmark-title-col1">
          <div class="icon-bookmark-black-transparent"></div>
        </div>
        <div class="bookmark-title-col2">
          <p class="bookmark-title-col2-text">${getDate(article.date)}</p>
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
    `bookmark-section-text-${category[article.category]}-${article.date}`,
  );
  if (template) return template;
  if (ListTemplate.childElementCount > 1)
    ListTemplate.insertAdjacentHTML(
      'beforeend',
      `
      <div class="bookmark-section-tap"></div>`,
    );
  ListTemplate.insertAdjacentHTML(
    'beforeend',
    `
  <div class="bookmark-section white">
    <div class="bookmark-section-icon">
      <div id class="icon-${category[article.category]}-blue"></div>
    </div>
    <ul class="bookmark-section-text" 
    id="bookmark-section-text-${category[article.category]}-${article.date}">
    </ul>
  </div>

  
`,
  );
  //아이콘 부분 추가
  return document.getElementById(
    `bookmark-section-text-${category[article.category]}-${article.date}`,
  );
}

function fillBookmark(template, article, articleId) {
  if (template.childElementCount > 0)
    template.insertAdjacentHTML(
      'beforeend',
      `
      <li class="bookmark-section-text-line"></li>`,
    );
  template.insertAdjacentHTML(
    'beforeend',
    `
      <li class="bookmark-section-text-area" id="item-${articleId}">
        <a href="articles/detail/${articleId}">
        <p class="bookmark-section-text-text">${article.headline}</p>
        </a>
      </li>
`,
  );
  //각 북마크 추가
  return document.getElementById(`item-${articleId}`);
}

function deleteElement(listTemplate, liItem) {
  var ulItem = liItem.parentElement;
  var sectionItem = ulItem.parentElement;
  var sectionINexttem = sectionItem.nextElementSibling;

  liItem.remove();

  if (ulItem.childElementCount < 1) {
    sectionINexttem?.remove();
    sectionItem.remove();
  }

  if (listTemplate.childElementCount == 1) {
    listTemplate.children[0].animate({ opacity: '0' }, { duration: 120, fill: 'forwards' });
    listTemplate.children[0].animate({ height: '0px' }, 200);
    setTimeout(() => {
      listTemplate.children[0].remove();
      listTemplate.remove();
    }, 200);
  }
}

function addEvent(listTemplate, liItem, acticleId) {
  var moveX;
  var pItem = liItem.children[0].children[0];
  var ulItem = liItem.parentElement;
  var iconItem = ulItem.previousElementSibling;

  liItem.addEventListener(
    'touchstart',
    (e) => {
      pItem.style.transitionDuration = '0s';
      moveX = e.touches[0].clientX;
    },
    { passive: true },
  );
  liItem.addEventListener(
    'touchmove',
    (e) => {
      pItem.style.transform = `translateX(${-moveX + e.touches[0].clientX}px)`;
    },
    { passive: true },
  );

  liItem.addEventListener(
    'touchcancel',
    (e) => {
      pItem.style.transform = `translateX(0px)`;
      pItem.style.transitionDuration = '0.5s';
    },
    { passive: true },
  );

  liItem.addEventListener(
    'touchend',
    (e) => {
      if (Math.abs(moveX - e.changedTouches[0].clientX) < 120) {
        pItem.style.transform = `translateX(0px)`;
        pItem.style.transitionDuration = '0.5s';
        return;
      }

      if (ulItem.childElementCount < 3) {
        iconItem.remove();
      }

      liItem.animate({ height: '0px' }, 151);
      //밑줄 삭제
      var underlineLiItem = liItem.nextElementSibling
        ? liItem.nextElementSibling
        : liItem.previousElementSibling;
      underlineLiItem?.animate({ opacity: '0' }, 151);

      setTimeout(() => {
        underlineLiItem?.remove();
        deleteElement(listTemplate, liItem);
        deleteBookmark(acticleId);
      }, 150);
    },
    { passive: true },
  );
}
