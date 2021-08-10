
const deleteAlarm = async(id) => {
    const token = localStorage['jwtToken'];
    id = String(id);
    try {
        await axios({
            method: 'post',
            url: '/alarm/del/'+id,
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

const deleteSection = async(id) => {
    deleteAlarm(id);
    var LiItem = document.getElementById(`alarm-box_${id}`);
    var parent = LiItem.parentNode;

    var underlineitem = LiItem.nextElementSibling
    ? LiItem.nextElementSibling
    : LiItem.previousElementSibling;

    function lineAnime(e1){
        // e1.animate({opacity: '0'}, 200, function(){
          e1.animate({height: '0px'}, 200);
        // });
      }
    lineAnime(LiItem);
    setTimeout(() => {
        parent.removeChild(LiItem);
        underlineitem?.remove();
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
        }
    },200);
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
}

function drop(event, id) {
    event.stopPropagation();
    event.preventDefault();
    posX = event.pageX;
    posY = event.pageY;
    if (Math.abs(posX - difX) > 100) //좌우 슬라이드 변화량 체크
        deleteSection(id);
    $('#mydiv').css('margin-left', posX + distX + 'px')
        .css('margin-top', posY + distY + 'px');
}
