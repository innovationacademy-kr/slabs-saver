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
			console.log(error.response.data.message);
		});
	}
};

getAlarmStatus();

// export {getAlarmStatus};
