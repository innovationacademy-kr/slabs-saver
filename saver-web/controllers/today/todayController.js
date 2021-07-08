const { Words, TodayWord } = require('../../models')

/**
 * 메인페이지에서 오늘의 한마디를 조회한다.
 */
const getMainTodayRequest = async (req, res) => {
	const { date } = req.query;
	console.log(date);
	const todayWord = await TodayWord.findOne({
		include: [
			{ model: Words, attributes: ['word']}
		],
		where: {
			date: new Date(date)
		}
	})
	res.status(200).json(todayWord);
}

module.exports = {
	request: {
		getMainToday: getMainTodayRequest,
	},
	page: {

	}
};
