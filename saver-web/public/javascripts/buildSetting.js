var buildPoint = document.querySelector('.bookmark_alarm-page');
const buildStart = () => {
    $.ajax({
      url: `/setting/getuser`,
      type: 'get',
      headers: { 'x-access-token': token },
      success: function (user) {
        console.log(user.user);
         getListTemplate(user.user[0]);

      },
      error: function (error) {
        alert(error.response.data.message);
      },
    });
  };
  
  buildStart();

  function getListTemplate(user) {

  
    buildPoint.insertAdjacentHTML(
        'beforeend',
        `
        <div class="bookmark_alarm-title">
        <!-- <div class="bookmark_alarm-title-col1">
          <div class="topbar__set__icon"></div>
        </div> -->
        <div class="bookmark_alarm-title-col2">
          <p class="bookmark_alarm-title-col2-text">
            계정
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text">${user.email}
          <button style="float:right; height:24px; background:#70b9f9;" id="logout" type="submit"> 로그아웃 </button>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text"> 자동로그인
          <span class="toggleBG inactive">
            <button class="toggleFG inactive"  id="autologin"></button>
          </span>
          </p>
        </div>
        </div>

        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section-tap"></div>

        <div class="bookmark_alarm-title">
        <div class="bookmark_alarm-title-col2">
          <p class="bookmark_alarm-title-col2-text">
            알림
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text"> 알림 끄기
          <span class="toggleBG ${getActive(user.alarmStatus)}">
            <button class="toggleFG ${getActive(user.alarmStatus)}"  id="alarmOnOff"></button>
          </span>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text">
          <button type="submit" style="background: #ffffff;" onclick="location.href='/alarm'"> 알림함 </button>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section-tap"></div>

        <div class="bookmark_alarm-title">
        <div class="bookmark_alarm-title-col2">
          <p class="bookmark_alarm-title-col2-text">
            고객센터
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text">
          <button type="submit" style="background: #ffffff;" > 고객센터 </button>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text">
          <button type="submit" style="background: #ffffff;" > 제보 및 제안 </button>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section-tap"></div>

        <div class="bookmark_alarm-title">
        <div class="bookmark_alarm-title-col2">
          <p class="bookmark_alarm-title-col2-text">
            이용안내
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text">
          <button type="submit" style="background: #ffffff;" > 약관 </button>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section white">
        <div class="bookmark_alarm-section-text">
          <p class="bookmark_alarm-section-text-text">
          <button type="submit" style="background: #ffffff;" > 세이버 소개 </button>
          </p>
        </div>
        </div>
        <div class="bookmark_alarm-section-text-line"></div>
        <div class="bookmark_alarm-section-tap"></div>
        </br>
        </br>
        `
    );
  }

  function getActive(flag)
  {
    if (flag == 1)
      return ('inactive');
    else
      return ('active');
  }