//임시로 공유버튼 설정 -> 수정 필요함
const marked = "article__control__right-buttons__share-button"
const unmarked = "article__control__right-buttons__bookmark-button"

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

const deleteBookmark = async(id) => {
  const token = localStorage['jwtToken'];
  axios.delete(`/bookmark/${id}`, {
      headers: {
      'x-access-token': token,
    }
  }).then ((res) => {
    alert('북마크를 해제했습니다.');
  }).catch ((err) => {
    console.error(err);
    alert('북마크 해제 실패했습니다.');
  });
}

const clickBookmark = (id, btnId) => {
  const btn_bookmark = document.getElementById(btnId);

  if (btn_bookmark.className == unmarked){
    enrollBookmark(id);
    btn_bookmark.className = marked;
  } else{
    deleteBookmark(id);
    btn_bookmark.className = unmarked;
  }
}

//초기 로딩할 때 북마크 상태에 따라 class를 다르게 로딩합니다.
const isBookmarked = async(id) => {
  const token = localStorage['jwtToken'];

  await axios({
      method: 'get',
      url: `/bookmark/${id}`,
      headers: {
        'x-access-token': token,
      }
  }).then ((res) => {
    result = res.data.result;
  }).catch ((err) => {
    console.error(err);
  });
  return result;
}

const selectBookmarkClass = (articleId, btnId) =>{
  const result = isBookmarked(articleId);
  const btn_bookmark = document.getElementById(btnId);

  result.then((result) => {
    console.log(result);
    if (result == true){
      btn_bookmark.className = marked;
    }
    else{
      btn_bookmark.className = unmarked;
    }
  });
}