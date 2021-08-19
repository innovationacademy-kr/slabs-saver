setTimeout( ()=> {
const sett = document.querySelector("#logout");
sett.addEventListener('click', (e) => {
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
    if (alarmbutton.classList.contains('inactive'))
    {
        alarmOnOff(3);
        alarmbutton.animate({left: '0px'}, 100);
    }
    else
    {
        alarmOnOff(1);
        alarmbutton.animate({left: '-45px'}, 100);
    }
    setTimeout(() => {
        alarmbutton.classList.toggle('active');
        alarmbutton.classList.toggle('inactive');
        alarmbuttonbg.classList.toggle('active');
        alarmbuttonbg.classList.toggle('inactive');
    }, 100)
});

}, 200);

