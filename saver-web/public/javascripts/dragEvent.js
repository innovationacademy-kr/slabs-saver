
const deleteAlarm = async(id) => {
    const token = localStorage['jwtToken'];
    id = String(id);
    try {
        result = await axios({
            method: 'post',
            url: '/alarm/del/'+id,
            headers: {
                'x-access-token':token,
            },
        });
        alert('알람 제거에 성공했습니다.');
    }
    catch (err) {
        console.log(err.response)
        alert('알람 제거에 실패했습니다.');
    }
}

let distX;
let distY;
let posX;
let posY;
let difX;
let difY;

function dragstart(event) {
    difX = event.pageX;
    difY = event.pageY;
    distX = event.srcElement.offsetLeft - difX;
    distY = event.srcElement.offsetTop - difY;
}

function dragover(event) {
    event.stopPropagation();
    event.preventDefault();
    window.location.reload()
}

function drop(event, id) {
    event.stopPropagation();
    event.preventDefault();
    posX = event.pageX;
    posY = event.pageY;
    if (Math.abs(posX - difX) > 100) //좌우 슬라이드 변화량 체크
        deleteAlarm(id);
    $('#mydiv').css('margin-left', posX + distX + 'px')
        .css('margin-top', posY + distY + 'px');
}
