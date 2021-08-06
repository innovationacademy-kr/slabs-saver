//북마크버튼
const marked = 'article__control__right-buttons__bookmark-button-active';
const unmarked = 'article__control__right-buttons__bookmark-button';

async function enrollBookmark(id) {
  try {
    result = await axios({
      method: 'post',
      url: `/bookmark/${id}`,
      headers: {
        'x-access-token': token,
      },
    });
  } catch (err) {}
}

const deleteBookmark = (id) => {
  axios({
    method: 'delete',
    url: `/bookmark/${id}`,
    headers: {
      'x-access-token': token,
    },
  })
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
};

const clickBookmark = (id, btnId) => {
  const btn_bookmark = document.getElementById(btnId);

  if (!token){
    alert('로그인 후 이용가능합니다.');
    window.location.href = '/subscriber/login';
  }
  else if (btn_bookmark.className == unmarked) {
    enrollBookmark(id);
    btn_bookmark.className = marked;
  } else {
    deleteBookmark(id);
    btn_bookmark.className = unmarked;
  }
};

//초기 로딩할 때 북마크 상태에 따라 class를 다르게 로딩합니다.
const isBookmarked = async (id) => {
  if (!token)
    return false;
  await axios({
    method: 'get',
    url: `/bookmark/${id}`,
    headers: {
      'x-access-token': token,
    },
  })
    .then((res) => {
      result = res.data.result;
    })
    .catch((err) => {
      console.error(err);
    });
  return result;
};

const selectBookmarkClass = (articleId, btnId) => {
  const result = isBookmarked(articleId);
  const btn_bookmark = document.getElementById(btnId);

  result.then((result) => {
    if (result == true) {
      btn_bookmark.className = marked;
    } else {
      btn_bookmark.className = unmarked;
    }
  });
};
