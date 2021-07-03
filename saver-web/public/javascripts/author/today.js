const txtArea = document.querySelector('#comment');
const btn_save = document.querySelector('#save');
const btn_edit = document.querySelector('#edit');
const btn_complete = document.querySelector('#complete');
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

btn_edit.addEventListener('click', (e) => {
	const comment = document.getElementById("comment");
	const qs = getQueryStringObject();
	const id = qs.id;
	if (comment.value == '')
	{
		alert('오늘의 한마디가 비어있습니다');
	}
	else{
		axios({
			method:"POST",
			url:'/author/today/edit',
			data: {
				"id" : id,
				"word" : comment.value, 
				"status" : 1 // 임시저장 상태
			}
		}).then((res)=>{
			location.href = '/author/today'
		}).catch(error =>{
			alert(error.response.data.message);
		})
	}
})

btn_complete.addEventListener('click', (e) => {
	const comment = document.getElementById("comment");
	const qs = getQueryStringObject();
	const id = qs.id;
	if (comment.value == '')
	{
		alert('오늘의 한마디가 비어있습니다');
	}
	else{
		axios({
			method:"POST",
			url:'/author/today/edit',
			data: {
				"id" : id,
				"word" : comment.value,
				"status" : 2  // 작성완료
			}
		}).then((res)=>{
			location.href = '/author/today'
		}).catch(error =>{
			alert(error.response.data.message);
		})
	}
})

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}