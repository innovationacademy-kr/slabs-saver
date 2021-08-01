async function enrollBookmark(id) {
  const token = localStorage['jwtToken'];
  try {
    result = await axios({
      method: 'post',
      url: `/bookmark/${id}`,
      headers: {
        'x-access-token': token,
      },
    });
    alert('북마크 되었습니다.');
  } catch (err) {
    alert('북마크에 실패했습니다.');
  }
}
