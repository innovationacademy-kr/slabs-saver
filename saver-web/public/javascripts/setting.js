setTimeout( () => {

const sett = document.querySelector("#logout");
sett.addEventListener('click', (e) => {

  var device = navigator.userAgent;

  if (device.indexOf("APP_IOS") > -1) {
    webkit.messageHandlers.logOut.postMessage("test");
  }
  //TODO: android firebase alerm 설정 추가.
  if (token) {
    localStorage.removeItem("jwtToken");
    location.href = '/';
  }
});

const autobutton = document.querySelector("#autologin");
autobutton.addEventListener('click', (e) => {
    autobuttonbg = autobutton.parentNode;
    if (autobutton.classList.contains('inactive'))
        autobutton.animate({left: '0px'}, 100);
    else
        autobutton.animate({left: '-40px'}, 100);
    setTimeout(() => {
        autobutton.classList.toggle('active');
        autobutton.classList.toggle('inactive');
        autobuttonbg.classList.toggle('active');
        autobuttonbg.classList.toggle('inactive');
    }, 100)
});

const alarmOnOff = async(flag) => {
    const token = localStorage['jwtToken'];
    try {
        await axios({
            method: 'post',
            url: `/setting/alarmOnOff/${flag}`,
            headers: {
                'x-access-token':token,
            },
        });
    }
    catch (err) {
        console.log(err)
    }
}

    const alarmbutton = document.querySelector("#alarmOnOff");
    alarmbutton.addEventListener('click', (e) => {


        alarmbuttonbg = alarmbutton.parentNode;
        if (alarmbutton.classList.contains('inactive')) {
            alarmbutton.animate({ left: '0px' }, 100);
            alarmOnOff(3);
            console.log(" alarm off ");

            const totalFollowingList = [1, 2, 3, 4, 5, 6];
            if (navigator.userAgent.includes('ANDROID')) {
                totalFollowingList.forEach((value) => {
                    Android.unsubscribeTopic(value);
                });
            } else if (navigator.userAgent.indexOf('APP_IOS') > -1) {
                followings.forEach((value) => {
                    webkit.messageHandlers.deleteFollowStatus.postMessage(value.toString());
                });
            }
        }
        else {
            alarmbutton.animate({ left: '-40px' }, 100);
            alarmOnOff(1);
            console.log(" alarm on ");
            axios({
                method: 'get',
                headers: { 'x-access-token': token },
                url: '/section/followlist',
            }).then((res) => {
                const followings = res.data.followCategory;
                const totalFollowingList = [1, 2, 3, 4, 5, 6];
                if (res.data.followingCategories) {
                    if (navigator.userAgent.includes('ANDROID')) {
                        totalFollowingList.forEach((value) => {
                            if (followings.includes(value.toString())) Android.subscribeTopic(value);
                            else Android.unsubscribeTopic(value);
                        });
                    } else if (navigator.userAgent.indexOf("APP_IOS") > -1) {
                        totalFollowingList.forEach((value) => {
                            if (followings.includes(value.toString()))
                                webkit.messageHandlers.updateFollowStatus.postMessage(value.toString());
                            else webkit.messageHandlers.deleteFollowStatus.postMessage(value.toString());
                        });
                    };
                } else {
                    if (navigator.userAgent.includes('ANDROID')) {
                        totalFollowingList.forEach((value) => {
                            Android.unsubscribeTopic(value);
                        });
                    } else if (navigator.userAgent.indexOf('APP_IOS') > -1) {
                        followings.forEach((value) => {
                            webkit.messageHandlers.deleteFollowStatus.postMessage(value.toString());
                        });
                    }
                }
            })
        }
        setTimeout(() => {
            alarmbutton.classList.toggle('active');
            alarmbutton.classList.toggle('inactive');
            alarmbuttonbg.classList.toggle('active');
            alarmbuttonbg.classList.toggle('inactive');
        }, 100)
    });


}, 100);
