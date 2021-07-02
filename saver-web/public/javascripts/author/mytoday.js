
/**
 * row를 그리기위한 HTML태그를 생성합니다.
 * @param {*} today
 * @returns
 */
const makeRow = (today) => {
	const htmlText = `
	<tr>
		<td>
			<span class="d-inline-block text-truncate">
				${today.word}
			</span>
		</td>
		<td>${todayWordStatus[today.status]}</td>
		<td>${'-'}</td>
		<td>${today.createdAt}</td>
	</tr>
	`;
	return htmlText;
}

/**
 * 불러온 오늘의 한마디배열을 table body에 하나씩 그립니다.
 * @param {*} todays
 */
const addTableRows = (todays) => {
	const tbody = $('.mytoday table tbody');
	todays.map(today => {
		tbody.append(makeRow(today))
	})
}

/**
 * 내가 쓴 오늘의 한마디를 조회합니다
 */
const getList = () => {
	console.log(axios);
	axios({
		method: 'get',
		url: '/author/today/my'
	}).then((res) => {
		addTableRows(res.data)
	}).catch((err) => {
		console.log(err);
	})
}


getList()