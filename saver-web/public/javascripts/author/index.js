function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var table = document.querySelector('.table');
var select = document.querySelector('#category');

table.addEventListener('change', function(e) {
  var cell = e.target.closest('.table-body__cell');
  var hiddenInput = cell.querySelector('.hidden');
  if (hiddenInput) {
    hiddenInput.value = hiddenInput.value === '1' ? '0' : '1';
  }
});

const currentCategory = getParameterByName('category');
if (currentCategory) {
  select.value = currentCategory;
}

/**
 * 업데이트 클릭시 ajax 요청
 */
const requestUpdate = (articles) => {
  axios.post('/author/desk-process', {articles})
    .then(res => {
      console.log(res);
      alert('수정되었습니다')
      location.reload();

    })
    .catch(err => {
      alert('실패했습니다')
      console.error(err);
    })
}

const addEvent = () => {
  articlesData = articlesData.map(function(item) {
    item.changed = {
      status: false,
      pm7: false,
      am7: false,
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
    const articleId = parseInt(dataset.id)
    const value = parseInt(e.target.value)

    articlesData = articlesData.map(function (item, index) {
      if (item.id === articleId) {
        const isStatusChanged = originArticlesData[index].status !== value;
        item.changed.status = isStatusChanged;
        item.status = value;
      }
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
    const chageList = getChangedArticle(articlesData);
    requestUpdate(chageList);
  })
}

   //알림 디비 추가 함수
   function newalarmdb(article, status, category){
     if (status === '4'){ //게재 상태인 기사인지 확인
      axios({
         method: "POST",
         url: '/alarm/alarm-process',
         data: {
           "articleId": article,
           "category": category,
         },
       }).then((res) => {
           console.log(res);
           return alert('알림디비가 추가되었습니다');
         }).catch((err) => {
           alert('실패했습니다')
           console.error(err);
         })
     }
     else {
       return alert('게재 된 기사가 아닙니다.');
     }
   }

addEvent();
