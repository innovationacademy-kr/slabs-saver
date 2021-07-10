const txtArea = document.querySelector('#comment');
const btn_save = document.querySelector('#save');
const result = document.querySelector('.result');

txtArea.addEventListener('keyup', (e) => {
	result.innerText = e.target.value;
})

btn_save.addEventListener('click', (e) => {
	const comment = document.getElementById("comment");
	console.log(comment.value);
	if (comment.value == '') {
		alert('오늘의 한마디가 비어있습니다');
	}
	else {
		axios({
			method: "POST",
			url: '/author/today/new',
			data: {
				"word": comment.value,
			}
		}).then((res) => {
			location.href = '/author/today'
		}).catch(error => {
			alert(error.response.data.message);
		});
	}
})