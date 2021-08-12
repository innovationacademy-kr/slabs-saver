var DEFAULT_HEIGHT = $(window).height() + 10;
var page = 0;
var pageStart = false;
var isUsed = true;
var alarmList = document.querySelector('.bookmark_alarm-page');

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

const upUserAlarmStatus = () => {
  if (token){
    axios({
      method: 'post',
      url: '/subscriber/updateAlarmStatus',
      headers: {
        'x-access-token': token
      }
    }).then((res) => {
    }).catch(error => {
      alert(error.response.data.message);
    });
  }
};

const getalarm = () => {
  $.ajax({
    url: `/alarm/article?page=${page}`,
    type: 'get',
    headers: { 'x-access-token': token },
    success: function (alarm) {
        console.log(alarm);
        alarm.alarm.map(function (alarm) {
            console.log(alarm);
          if (!(alarm.deleted))
          {
          const article = alarm.Article;
          //updateAt은 yyyy-MM-dd HH:mm:ss.SSS의 simpledateformat으로 구성됨
          const alarmUpdate = alarm.updatedAt.split('T');
          const listTemplate = getListTemplate(alarmUpdate[0]);
          const boxId = fillalarm(getSectionTemplate(listTemplate, article, alarmUpdate[0]), article, alarm.ArticleId);
          addEvent(boxId, alarm.ArticleId);
          }
        });
      isUsed = false;
      page += 20;
      if (!pageStart)
      {
        pageStart = true;
        if ((!isUsed && $(window).height() == $(document).height()) && !isUsed) {
          isUsed = true;
          getalarm();
        }
      }
    },
    error: function (err) {},
  });
};

upUserAlarmStatus();
getalarm();



$(window).scroll(function () {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if ((scrollPosition >= pageHeight) && !isUsed) {
    isUsed = true;
    getalarm();
  }
});

function getDate(articleDate) {
  var today = new Date();
  var date = articleDate.split('-');
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


function getListTemplate(aldate) {
  var template = document.getElementById(`bookmark-list-${aldate}`);

  if (template) return template;

  alarmList.insertAdjacentHTML(
    'beforeend',
    `
    <div class="bookmark-list" id="bookmark-list-${aldate}">
      <div class="bookmark_alarm-title">
        <div class="bookmark_alarm-title-col1">
          <div class="icon-alarm-black-transparent"></div>
        </div>
        <div class="bookmark_alarm-title-col2">
          <p class="bookmark_alarm-title-col2-text">${getDate(aldate)}</p>
        </div>
      </div>
    </div>
`,
  );
  //날짜부분 추가
  return document.getElementById(`bookmark-list-${aldate}`);
}

function getSectionTemplate(ListTemplate, article, aldate) {
  var template = document.getElementById(
    `bookmark_alarm-section-text-${category[article.category]}-${aldate}`,
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
    id="bookmark_alarm-section-text-${category[article.category]}-${aldate}">
    </div>
  </div>

  <div class="bookmark_alarm-section-tap"></div>
`,
  );
  //아이콘 부분 추가
  return document.getElementById(
    `bookmark_alarm-section-text-${category[article.category]}-${aldate}`,
  );
}

function fillalarm(template, article, articleId) {
  if (template.childNodes.length > 2)
    template.insertAdjacentHTML(
      'beforeend',
      `
      <div class="bookmark_alarm-section-text-line"></div>`,
    );
    template.insertAdjacentHTML(
      'beforeend',
      `
        <div class="bookmark_alarm-section-text-area" id="alarm-box_${articleId}">
          <div style="position:relative;" id="drawer_${articleId}" ondrop="drop(event, '${articleId}')" ondragover="dragover(event)">
            <div style="positon:absolute;" id="mydiv_${articleId}" draggable="true" ondragstart="dragstart(event)">
              <a href="articles/detail/${articleId}">
              <p class="bookmark_alarm-section-text-text">${article.headline}</p>
              </a>
            </div>
          </div>
        </div>
  `,
    );
  //각 북마크 추가
  return document.getElementById(`alarm-box_${articleId}`);
}

const deleteAlarm = async(id) => {
  const token = localStorage['jwtToken'];
  id = String(id);
  try {
      await axios({
          method: 'post',
          url: `/alarm/del/${id}`,
          headers: {
              'x-access-token':token,
          },
      });
    }
    catch (err) {
        console.log(err)
        alert('알람 제거 실패.');
    }
}

function addEvent(liItem, articleId) {
  var moveX;
  var pItem = liItem.children[0].children[0];
  var parent = liItem.parentNode;

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

      var underlineLiItem = liItem.nextElementSibling
      ? liItem.nextElementSibling
      : liItem.previousElementSibling;

      deleteAlarm(articleId);
      function lineAnime(e1){
        // e1.animate({opacity: '0'}, 200, function(){
          e1.animate({height: '0px'}, 200);
        // });
      }
        lineAnime(liItem);
      setTimeout(() => {
        parent.removeChild(liItem);
        underlineLiItem?.remove();
        if (parent.childElementCount <= 0)
        {
          var prevLiItem = parent.parentNode.previousElementSibling;
          var nextLiItem = parent.parentNode.nextElementSibling;
          parent.parentNode.remove();
          nextLiItem.remove();
          let temp;
          temp = (prevLiItem.className == 'bookmark_alarm-title')
          ? (prevLiItem.nextElementSibling) 
            ?(prevLiItem.nextElementSibling.className == 'bookmark_alarm-title')
              ? prevLiItem.remove()
              :null
            : prevLiItem.remove()
          :null
            // console.log("del");
        }
      }, 200);
    },
    { passive: true },
  );
}