async function sendMessagePush(messageData) {
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
      alert('알림을 보냈습니다.');
      window.location = '/author/push';
    },
    error: function (request) {
      console.error(request.responseJSON.error);
      alert('알림을 보내지 못했습니다.');
      document.getElementById('complete-btn').disabled = false;
    },
  });
}
