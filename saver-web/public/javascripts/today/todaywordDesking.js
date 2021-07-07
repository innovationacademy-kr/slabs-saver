
/*
 * 업데이트 클릭시 post 요청
 */

const requestUpdate = (words) => {
  axios.post('/author/todaydesking', {words})
    .then(res => {
      alert('수정되었습니다')
    })
    .catch(err => {
      alert('실패했습니다')
      console.error(err);
    })
}

/**
 * 변화 감지할 changed변수 초기화
 */

const addEvent = () => {
  wordsData = wordsData.map(function(item) {
    item.changed = false
    return item;
  })

/**
 * 달력값 변경시 저장
 */

//wordData 돌면서 수정된 값 확인, 재할당
const dateSelector = $('.date');


function setDate(wordId, value) {
    wordsData = wordsData.map(function (item, index) {
      if (item.id === wordId) {
        const isValueChanged = originWordsData[index].TodayWord.date !== value;
        item.status = 3;
        item.TodayWord.date = value;
        item.changed = isValueChanged;
      }
      return item;
    })
}

function isThereSameDate(wordId, value) {
  for(i=0; i < dateSelector.length; i++){
    const dateId = parseInt(dateSelector[i].dataset.id);
    if ( dateId === wordId) {
      continue;
    } else if (dateSelector[i].value === value){
      return true;
    } else {
      continue;
    }
  }
}


  dateSelector.on('change', function (e) {
    const { target: { dataset } } = e;
    const wordId = parseInt(dataset.id) // date-id 할당
    const value = e.target.value //input 값 할당

    if(isThereSameDate(wordId, value)){
      alert('중복된 날짜입니다.');
      const originDate = originWordsData.find(item=>item.TodayWord.id === wordId)
      e.target.value = originDate.TodayWord.date; //originDate의 날짜 넣기
    } else {
      setDate(wordId, value);
    }
  });

  /**
   * 초기화 클릭시 데이터 삭제
   */

  const resetSelector = $('.reset');
  resetSelector.on('click', (e) => {
      const wordId = parseInt(e.target.dataset.id);
      const value = "";
      e.target.previousElementSibling.value = value;
      wordsData = wordsData.map((item, index) => {
        if (item.id === wordId){
          const isValueChanged = originWordsData[index].TodayWord.date !== value;
          item.status = 2;
          item.TodayWord.date = value;
          item.changed = isValueChanged;
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
