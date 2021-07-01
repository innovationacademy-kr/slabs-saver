const txtArea = document.querySelector('#comment');
const btn_save = document.querySelector('#save');
const btn_edit = document.querySelector('#edit');
const btn_complete = document.querySelector('#complete');
const result = document.querySelector('.result');

txtArea.addEventListener('keyup', (e) => {
	result.innerText = e.target.value;
})
btn_save.addEventListener('click', (e) => {
	alert('저장 클릭!');
})
btn_edit.addEventListener('click', (e) => {
	alert('수정 클릭!');
})
btn_complete.addEventListener('click', (e) => {
	alert('완료 클릭!');
})