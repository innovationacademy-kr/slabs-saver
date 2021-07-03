/**
 * 오전 06:59 이전에는 어제 날짜
 * 오전 07:00 이후에는 오늘 날짜
 * YYYY-MM-DD
 */
const getProperDate = () => {
	// Date.now()
	const now = new Date()
	const h = now.getHours();
	if (h < 7) {
		now.setDate(now.getDate() - 1)
	}
	let date = now.toISOString(); // "2021-06-30T14:26:31.955Z"
	date = date.slice().slice(0, 10);
	return date;
}

/**
 * 오늘의 한마디 정보를 조회합니다.
 */
const todayWord = (date) => {
	console.log(date);
	return axios({
		method: "get",
		url: 'https://jsonplaceholder.typicode.com/todos/1'
	})
}

/**
 * 오늘의 한마디 정보를 가져와 엘리먼트에 업데이트합니다.
 */
const getTodayWord = () => {
	const date = getProperDate();
	todayWord(date).then(res => {
		const word = res.data.title;
		if (word) {
			const element = `<p>${word}</p>`;
			$("#today_word").append(element);
		} else {
			$("#today_word").hide()
			$(".today_word").hide()
		}
	}).catch(err => {
		$("#today_word").hide()
		$(".today_word").hide()
		console.log(err);
	});
}

const addEvent = () => {
	// 리스트는 처음부터 존재하기 때문에 리스트에게 이벤트리스너를 등록함
	$('.article-list').on('click', (e) => {
		const { target } = e;
		// 내가 지금 누른 엘리먼트의 클래스가 버튼명이랑 같은지 확인
		if (target.className === 'article__control__more-button') {
			// 버튼에는 data-id라는 어트리뷰트를 등록함. 해당 값음 target.dataset.id로 참조가능
			const { id } = target.dataset;
			$(`#editorjs_paragraphs_0${id}`).removeClass('close');
			$(`#editorjs_paragraphs_0${id}`).addClass('open');
		}
	})
}

addEvent();
getTodayWord()