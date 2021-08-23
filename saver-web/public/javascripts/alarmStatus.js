const getAlarmStatus = () => {
	const alarmIcon = document.querySelector(`#alarm i`)
	if (token){
		axios({
			method: 'post',
			url: '/subscriber/getAlarmStatus',
			headers: {
				'x-access-token': token
			}
		}).then((res) => {
			if (res.data.alarmStatus === 2) alarmIcon.classList.add('new');
		}).catch(error => {
			if(error.response.status === 403)
			{
				var url = location.href
				url = url.replace("/logined","")
				url = url.substring(url.lastIndexOf('/'),url.length)
			
				localStorage.removeItem('jwtToken')
				if(url == '/')
					location.href = `/`;
				else
			 		location.href = `/subscriber/login?redirect=${url}`;
			} 
			console.log(error.response.data.message);
		});
	}
};

getAlarmStatus();

// export {getAlarmStatus};
