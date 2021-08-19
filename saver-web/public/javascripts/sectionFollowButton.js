const my_section_default_div = document.querySelector('#my_section_default');

let currentUserID;
let followCount = 0;

// [start : ios에서 핀치와 더블탭을 통한 화면 확대, 축소 방지]
document.addEventListener(
  'touchmove',
  function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  false,
);

var lastTouchEnd = 0;
document.addEventListener(
  'touchend',
  function (event) {
    var now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false,
);
// [end : ios에서 핀치와 더블탭을 통한 화면 확대, 축소 방지]

const init_section = function (id) {
  const class_name = '#' + id;
  const div_id = document.querySelector(class_name);
  div_id.style.display = 'none';
  if (followCount == 0) my_section_default_div.style.display = 'grid';
  else my_section_default_div.style.display = 'none';
};

const section_display_change = function (btnId) {
  let div_id = btnId;
  let following = false;

  //check-button-id : button or text-field
  // 버튼안의 텍스트를 클릭했을 경우 버튼id가져오기
  //destroy버튼일경우 소문자로, 팔로잉상태 on, 앞에문자제거.

  if (div_id.includes('destroy')) {
    following = true;
    div_id = div_id.split('-')[1];
  }

  //div sections 선택하기
  const my_section = document.querySelector('#my-' + div_id);
  const other_section = document.querySelector('#other-' + div_id);
  //상단하단 div-section display 상태 변경하기
  if (following) {
    my_section.style.display = 'none';
    other_section.style.display = 'grid';
    followCount -= 1;
  } else {
    my_section.style.display = 'grid';
    other_section.style.display = 'none';
    followCount += 1;
  }

  // follow count에 따라 기본 섹션 보이기 및 숨기기
  if (followCount > 0) my_section_default_div.style.display = 'none';
  else my_section_default_div.style.display = 'grid';
};

// page load 시 로그인 정보 확인 / page 렌더
window.onload = function () {
  if (!token) {
    location.href = '/section/';
  } else {
    axios({
      method: 'post',
      url: '/section/user',
      headers: {
        'x-access-token': token,
      },
    })
      .then((res) => {
        currentUserID = res.data;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  axios({
    method: 'get',
    url: '/section/followlist',
    headers: {
      'x-access-token': token,
    },
  })
    .then((res) => {
      if (res.data.followCategory) {
        categories = ['economy', 'politics', 'international', 'social', 'culture', '7'];

        categories.forEach((category, i) => {
          index = i + 1;
          if (res.data.followCategory.includes(`${index}`)) {
            document.getElementById(`my-${category}`)?.setAttribute('style', 'display: grid;');
            document.getElementById(`other-${category}`)?.setAttribute('style', 'display: none;');
          } else {
            document.getElementById(`my-${category}`)?.setAttribute('style', 'display: none;');
            document.getElementById(`other-${category}`)?.setAttribute('style', 'display: grid;');
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });
};

// 팔로우 언팔로우 버튼을 클릭했을 때.
const clickFollow = (btnId, value, btnUrl) => {
  var userAgent = navigator.userAgent;
  if (!token) {
    location.href = '/section';
  } else {
    axios({
      method: 'post',
      url: btnUrl,
      data: {
        userId: currentUserID,
        followValue: value,
      },
    })
      .then((res) => {
        section_display_change(btnId);

        if (btnUrl === 'follow') {
          if (userAgent.includes('ANDROID')) {
            Android.subscribeTopic(value);
          }
          if (userAgent.indexOf('APP_IOS') > -1) {
            webkit.messageHandlers.updateFollowStatus.postMessage(value);
          }
          alert('팔로우 되었습니다.');
        } else {
          if (userAgent.includes('ANDROID')) Android.unsubscribeTopic(value);
          if (userAgent.indexOf('APP_IOS') > -1) {
            webkit.messageHandlers.deleteFollowStatus.postMessage(value);
          }
          alert('언팔로우 되었습니다.');
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
};
