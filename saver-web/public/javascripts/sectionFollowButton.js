const politic = document.querySelector("#politic");
const economy = document.querySelector("#economy");
const international = document.querySelector("#international");
const social = document.querySelector("#social");
const culture = document.querySelector("#culture");
const ampm = document.querySelector("#ampm");

const destroyPolitic = document.querySelector("#destroyPolitic");
const destroyEconomy = document.querySelector("#destroyEconomy");
const destroyInternational = document.querySelector("#destroyInternational");
const destroySocial = document.querySelector("#destroySocial");
const destroyCulture = document.querySelector("#destroyCulture");
const destroyAmpm = document.querySelector("#destroyAmpm");

const my_section_default_div = document.querySelector("#my_section_default");

let currentUserID
let followCount = 0;

const print_follow_count = function () {
  console.log("number of following sections: " + followCount);
}

const print_section = function (e) {
  console.log(e)
}

const init_section = function (id) {
  const class_name = "#" + id;
  const div_id = document.querySelector(class_name);
  div_id.style.display = "none"
  if (followCount == 0)
	my_section_default_div.style.display = "grid";
  else
	my_section_default_div.style.display = "none";
}

const section_display_change = function (btnId) {
  let div_id = btnId.id;
  let following = false;

  //check-button-id : button or text-field
  // 버튼안의 텍스트를 클릭했을 경우 버튼id가져오기
  //destroy버튼일경우 소문자로, 팔로잉상태 on, 앞에문자제거.
  if (div_id.indexOf("destroy") == 0) {
	following = true;
	div_id = div_id.substring(7, btnId.id.length);
	div_id = div_id.toLowerCase();
  }

  //div sections 선택하기
  const my_section = document.querySelector("#my-" + div_id)
  const other_section = document.querySelector("#other-" + div_id)
  //상단하단 div-section display 상태 변경하기
  if (following) {
	my_section.style.display = "none"
	other_section.style.display = "grid"
	followCount -= 1;

  } else {
	my_section.style.display = "grid"
	other_section.style.display = "none"
	followCount += 1;
  }

  // follow count에 따라 기본 섹션 보이기 및 숨기기
  print_follow_count();
  if (followCount > 0)
	my_section_default_div.style.display = "none";
  else
	my_section_default_div.style.display = "grid";
}

// page load 시 로그인 정보 확인 / page 렌더
window.onload = function () {
  if (!token) {
	location.href = '/section/'
  } else {
	axios({
	  method: 'post',
	  url: '/section/user',
	  headers: {
		'x-access-token': token
	  }
	}).then((res) => {
	  currentUserID = res.data;
	}).catch(error => {
	  alert(error.response.data.message);
	});
  }
}

const clickFollow = (btnId, value, btnUrl) => {

  if (!token) {
	location.href = 'user/login'
  } else {
	axios({
	  method: 'post',
	  url: btnUrl,
	  data: {
		userId: currentUserID,
		followValue: value,
	  }
	}).then((res) => {
	  if (btnUrl === 'follow')
		alert('팔로우 되었습니다.');
	  else
		alert('언팔로우 되었습니다.');
	  section_display_change(btnId);
	}).catch(error => {
	  alert(error.response.data.message);
	});
  }
};
