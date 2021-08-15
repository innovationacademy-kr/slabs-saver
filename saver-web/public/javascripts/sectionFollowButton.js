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

// 현재 호출한 디바이스가 어떤 것인지 체크
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	any: function () {
		return (isMobile.Android() || isMobile.iOS());
	}
};


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
        alert(error.message);
      });
  }
};

// 팔로우 언팔로우 버튼을 클릭했을 때.
const clickFollow = (btnId, value, btnUrl) => {
  console.log(btnId + " ?? "+value);
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
			if (isMobile.iOS()) {
	    		webkit.messageHandlers.updateFollowStatus.postMessage(value);
			}
			alert('팔로우 되었습니다.');
			}
        else {
			if (isMobile.iOS()) {
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
