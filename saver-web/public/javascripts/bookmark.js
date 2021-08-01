const token = localStorage['jwtToken'];

async function enrollBookmark(id) {
  id = Number(id);
  let result;
  console.log(typeof id + ': ' + id);
  try {
    result = await axios({
      method: 'post',
      url: `/subscriber/bookmark/${id}`,
      headers: {
        'x-access-token': token,
      },
    });
    alert('북마크 되었습니다.');
  } catch (err) {
    alert('북마크에 실패했습니다.');
  }
}
