const { Article, Words, TodayWord, TodayArticle } = require('../../models')

/**
 * 메인페이지에서 오늘의 한마디를 조회한다.
 */
const getMainTodayWordRequest = async (req, res) => {
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

/**
 * 메인페이지에서 오늘의 기사를 조회한다.
 */
const getMainTodayArticleRequest = async (req, res) => {
	const { date } = req.query;
	const todayArticle = (await TodayArticle.findOne({
		include: [
			{ model: Article, attributes: ['headline']}
		],
		where: {
			date: new Date(date)
		},
		attributes: ['id', 'date']
	})).get({plain: true});

	res.status(200).json(todayArticle);
}

module.exports = {
	request: {
		getMainTodayWord: getMainTodayWordRequest,
		getMainTodayArticle: getMainTodayArticleRequest
	},
	page: {

	}
};
