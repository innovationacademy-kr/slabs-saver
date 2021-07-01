/**
 * 업데이트 클릭시 ajax 요청
 */
const requestUpdate = (articles) => {
	axios.post('/author/desk-process', { articles })
		.then(res => {
			console.log(res);
			alert('수정되었습니다')
		})
		.catch(err => {
			alert('수정에 실패하였습니다.')
			console.error(err);
		})
}

const addEvent = () => {
	$('form').on('submit', (e) => {
		e.preventDefault();
		const payload = new FormData();
		payload.append('email', $('#email')[0].value);
		payload.append('password', $('#password')[0].value);
		payload.append('confirm', $('#confirm')[0].value);
		payload.append('name', $('#name')[0].value);
		payload.append('category', user.category || 0);
		payload.append('code', $('#position')[0].value);
		payload.append('position', $('#position')[0].value);
		payload.append('contact', $('#contact')[0].value);
		// 이미지는 blob타입으로 formData에 저장되며, 해당 경우 세번째 파라미터에 파일이름을 지정해줘야한다.
		payload.append('picture', $('#picture')[0].files[0], $('#picture')[0].files[0].name);
		axios.post('/author/signup', payload, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => {
			if (res.data.result) {
				alert('회원가입되었습니다.');
				window.location.href = '/author/login';
			} else {
				alert(res.data.message);
			}
		}).catch((err) => {
			console.error(err);
			alert(res.data.message || err.message);
		});
	})
}

addEvent();
