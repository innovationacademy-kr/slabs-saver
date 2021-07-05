//TODO : 날짜 지난 오늘의 한마디 비활성화
//TODO : 같은 날짜 선택 막아두기
//TODO : 날짜 초기화시 date삭제

/*
 * 업데이트 클릭시 ajax 요청
 */

const requestUpdate = (words) => {
  axios.post('/author/todayworddesking', {words})
    .then(res => {
      alert('수정되었습니다')
    })
    .catch(err => {
      alert('실패했습니다')
      console.error(err);
    })
}

//초기화, 배열로 바꿈
const addEvent = () => {
  wordsData = wordsData.map(function(item) {
    item.changed = false
    return item;
  })

/**
 * 달력값 변경시 저장
 */

  // 셀렉트 이벤트 리스너
  const selector = $('.date');
  selector.on('change', function (e) {
    const { target: { dataset } } = e;

    const wordId = parseInt(dataset.id) // date-id 할당
    const value = e.target.value //input 값 할당

    //오늘의 한마디 날짜 수정, status값 변경
    wordsData = wordsData.map(function (item, index) {
      if (item.id === wordId) {
        //원데이터랑 비교
        const isValueChanged = originWordsData[index].date !== value;
        if (!item.TodayWord){ //todayword 선정 안 되어있으면
          item.TodayWordnew = {
            date : value,
          }
          item.status = 3;
          item.changed = isValueChanged;
        }else {
          item.TodayWord.date = value;
          itme.changed = isValueChanged;
        }
      }
      return item;
    })
  });

/**
 * 변경된 섹션만 저장
 */

  function getChangedWords (arr) {
    return arr.filter((item) => {
      return item.changed
    })
  }

  /**
   * 하단 업데이트 버튼 이벤트 추가
   */

  const btn = $(".update-btn");
  btn.on('click', function() {
    const chageList = getChangedWords(wordsData);
    console.log('chageList', chageList);
    requestUpdate(chageList);
  })
}
//todayword 조인은 시도했지만 아직 연결된 테이블이 없다
addEvent();
