async function sendAriclePush(articleId) {
  const token = localStorage['jwtToken'];

  $.ajax({
    url: `/firebase/${articleId}`,
    type: 'post',
    headers: {
      'x-access-token': token,
    },
    success: function () {
      alert('알림을 보냈습니다.');
    },
    error: function (err) {
      console.log(err);
      alert('알림을 보내지 못했습니다.');
    },
  });
}

async function sendMessagePush(messageData) {
  const token = localStorage['jwtToken'];
  const message = {};
  message['message'] = messageData;
  $.ajax({
    url: `/firebase`,
    type: 'post',
    headers: {
      'x-access-token': token,
    },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(message),
    success: function () {
      alert('알림을 보냈습니다.');
    },
    error: function (err) {
      console.log(err);
      alert('알림을 보내지 못했습니다.');
    },
  });
}
