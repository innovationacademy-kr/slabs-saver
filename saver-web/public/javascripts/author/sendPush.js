
//알림 디비 추가 함수
function isnewalarmdb(article, category){
  axios({
     method: "POST",
     url: '/alarm/alarm-process',
     data: {
       "articleId": article,
       "category": category,
     },
   }).then((res) => {
       console.log(res);
       alert('알림을 보냈습니다');
       return window.location = '/author/push';
     }).catch((err) => {
       document.getElementById('complete-btn-${articleId}').disabled = false;
       console.error(err);
       alert('알림을 저장하지 못했습니다.');
     })
}


async function sendMessagePush(messageData, articleId) {
  const token = localStorage['jwtToken'];
  const message = {};

  message['message'] = messageData;
  $.ajax({
    url: `/author/push`,
    type: 'post',
    headers: {
      'x-access-token': token,
    },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(message),
    success: function () {
      isnewalarmdb(articleId, messageData['topic']);
      // window.location = '/author/push';
    },
    error: function (request) {
      console.error(request.responseJSON.error);
      alert('알림을 보내지 못했습니다.');
      document.getElementById('complete-btn-${articleId}').disabled = false;
    },
  });
}
