//TODO : 날짜 지난 오늘의 한마디 비활성화
//TODO : 같은 날짜 선택 막아두기


var table = document.querySelector('.table');

table.addEventListener('change', function(e) {
  var cell = e.target.closest('.table-body__cell');
  var hiddenInput = cell.querySelector('.hidden');
  if (hiddenInput) {
    hiddenInput.value = hiddenInput.value === '1' ? '0' : '1';
  }
});

/*
 * 업데이트 클릭시 ajax 요청
 */
const requestUpdate = (words) => {
  axios.post('/author/todaydesking', {words})
    .then(res => {
      console.log(res);
      alert('수정되었습니다')
    })
    .catch(err => {
      alert('실패했습니다')
      console.error(err);
    })
}

//초기화
const addEvent = () => {
  wordsData = wordsData.map(function(item) {
    item.changed = {
      status: false
    }
    return item;
  })


  /**
   * 테이블 row마다 이벤트 추가
   */
  const rows = $('.table-body__row');
  rows.on('click', function(e)  {
    const {
      target: {
        id: key, // am7, pm7
        checked
      },
      currentTarget
    } = e;
    const articleId = parseInt(currentTarget.dataset.id);

    if (['am7', 'pm7'].indexOf(key) !== -1) {
      articlesData = articlesData.map(function(item, index) {
        if (item.id === articleId) {
          item[key] = checked;
          const isChanged = originArticlesData[index][key] !== checked;
          item.changed[key] = isChanged;
        }
        return item;
      })
    }
  });

  // 셀렉트 이벤트 리스너
  const selector = $('select.statusSelector');
  selector.on('change', function (e) {
    const { target: { dataset } } = e;
    const articleId = parseInt(dataset.id)// date-id 할당
    const value = parseInt(e.target.value) //input 값 할당

    articlesData = articlesData.map(function (item, index) {
      if (item.id === articleId) {
        const isValueChanged = originWordsData[index].date !== value;
        //if (데이터에 날짜값이 없으면 ){
        //  데이터 상태값 바꾸기
        //}
        item.todaywords.date = value;
      } // 값 바꿔주는중...
      return item;
    })
    console.log(getChangedArticle(articlesData));
  });

  function getChangedArticle (arr) {
    return arr.filter(function(item) {
      const isSomethingChanged = Object.keys(item.changed).some(function(key) {
        return item.changed[key];
      })
      return isSomethingChanged
    })
  }

  /**
   * 하단 업데이트 버튼 이벤트 추가
   */

  const btn = $(".update-btn");
  btn.on('click', function() {
    const chageList = getChangedArticle(wordsData);
    requestUpdate(chageList);
  })
}

addEvent();
