async function sendPush(articleId) {
  const token = localStorage['jwtToken'];

  $.ajax({
    url: `/firebase/${articleId}`,
    type: 'post',
    headers: {
      'x-access-token': token,
    },
    success: function () {},
    error: function (err) {
      console.log(err);
    },
  });
}
