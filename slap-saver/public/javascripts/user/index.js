
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