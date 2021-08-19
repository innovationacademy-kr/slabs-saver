/**
 * 오전 06:59 이전에는 어제 날짜
 * 오전 07:00 이후에는 오늘 날짜
 * YYYY-MM-DD
 * 실제 시간과는 다르지만 한국표준시와 UTC의 차이 때문에 offset만큼 빼준다.
 */
const getProperDate = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const now = new Date();

  const h = now.getHours();
  if (h < 7) {
    now.setDate(now.getDate() - 1);
  }
  const real = new Date(now - offset);
  let date = real.toISOString();
  console.log(date);
  date = date.slice().slice(0, 10);
  return date;
};

/**
 * 오늘의 한마디 정보를 조회합니다.
 */
const todayWord = (date) => {
  return axios({
    method: 'get',
    url: '/today/word',
    params: {
      date,
    },
  });
};

/**
 * 오늘의 기사 정보를 조회합니다.
 */
const todayArticle = (date) => {
  return axios({
    method: 'get',
    url: '/today/article',
    params: {
      date,
    },
  });
};

/**
 * 오늘의 한마디 정보를 가져와 엘리먼트에 업데이트합니다.
 */
const getTodayWord = () => {
  const date = getProperDate();
  todayWord(date)
    .then((res) => {
      if (res.data.Word) {
        const { word } = res.data.Word;
        $('#today_word').append(word);
      } else {
        $('#today_word').hide();
        $('.today_word').hide();
      }
    })
    .catch((err) => {
      $('#today_word').hide();
      $('.today_word').hide();
      console.log(err);
    });
};

/**
 * 오늘의 기사 정보를 가져와 엘리먼트에 업데이트합니다.
 */
const getTodayArticle = () => {
  const date = getProperDate();
  todayArticle(date)
    .then((res) => {
      if (res.data.Article) {
        const { headline, id } = res.data.Article;
        $('#today_article').append(headline);
        $('#today_article_link').attr('href', `${document.location.href}articles/detail/${id}`);
      } else {
        $('#today_article').hide();
        $('.today_article').hide();
      }
    })
    .catch((err) => {
      $('#today_article').hide();
      $('.today_article').hide();
      console.log(err);
    });
};

const addEvent = () => {
  // 리스트는 처음부터 존재하기 때문에 리스트에게 이벤트리스너를 등록함
  $('.article-list').on('click', (e) => {
    const { target } = e;
    // 내가 지금 누른 엘리먼트의 클래스가 버튼명이랑 같은지 확인
    if (target.className === 'article__control__more-button') {
      // 버튼에는 data-id라는 어트리뷰트를 등록함. 해당 값음 target.dataset.id로 참조가능
      const { id } = target.dataset;
      let originType = 'more';
      let changeType = 'fold';
      if (target.childNodes[1].className.includes('more')) {
        $(`#editor_paragraphs_0${id}`).removeClass('hide');
        $(`#editor_paragraphs_0${id}`).addClass('open');
      } else {
        $(`#editor_paragraphs_0${id}`).addClass('hide');
        $(`#editor_paragraphs_0${id}`).removeClass('open');
        originType = changeType;
        changeType = 'more';
      }
      target.childNodes[1].className = target.childNodes[1].className.replace(
        originType,
        changeType,
      );
    }
  });
};

const articleCategroryEvent = () => {
  const token = localStorage['jwtToken'];
  if (!token) $('.article-choice').hide();
  else {
    $('.article-choice').show();
    // 팔로잉 리스트를 불러와 구독합니다.
    axios({
      method: 'get',
      headers: { 'x-access-token': token },
      url: '/section/followlist',
    }).then((res) => {
      const followings = res.data.followCategory;
      const totalFollowingList = [1, 2, 3, 4, 5, 6];
      if (navigator.userAgent.includes('ANDROID')) {
        totalFollowingList.forEach((value) => {
          if (followings.includes(value.toString())) Android.subscribeTopic(value);
          else Android.unsubscribeTopic(value);
        });
      }
    });
  }
};

const getUserFirebaseFollowingStatus = (token) => {
  return axios({
    method: 'get',
    url: '/subscriber/setFirebase',
    headers: {
      'x-access-token': token,
    },
  })
}

const setUserFirebaseFollowingStatus = () => {
  const token = localStorage['jwtToken'];
  var br = navigator.userAgent;

  const userFollowStatus = getUserFirebaseFollowingStatus(token).then((res) => {
    if (res.data) {
      const statusArray = res.data.split(",").map((x) => +x);
      for (var value = 1; value <= 6; value++) {
        if (statusArray.find(value)) {
          if (br.indexOf("APP_IOS") > -1) {
            webkit.messageHandlers.updateFollowStatus.postMessage(value);
          }
          console.log("subscribe: ");
          console.log(value);
        } else {
          if (br.indexOf("APP_IOS") > -1) {
            webkit.messageHandlers.deleteFollowStatus.postMessage(value)
          }
          console.log("unsubscribe: ");
          console.log(value);
        }
      }
    }
  })
}

$('#article-category-list').hide();
addEvent();
getTodayWord();
getTodayArticle();
articleCategroryEvent();
setUserFirebaseFollowingStatus();
