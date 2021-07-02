const getCurrentUser = require('../../../lib/getCurrentUser');
const { Words } = require('../../../models')
const POSITION = require('../../../lib/constants/position');
const TODAYWORD = require('../../../lib/constants/todayWordStatus');
const { constants } = require('../../../lib/converter');

const getTodayRequest = async (req, res) => {
	console.log({ Words });
	const words = await Words.findAll({ where: { AuthorId: req.user.id } });
	res.status(200).json(words);
}

const createTodayPage = async (req, res) => {
	const currentUser = await getCurrentUser(req.user.id);
	res.render('author/today/createToday', {
		layout: 'layout/adminLayout',
		currentUser,
		title: 'today',
		POSITION
	})
}

const todayPage = async (req, res) => {
	const currentUser = await getCurrentUser(req.user.id);
	res.render('author/today/mytoday', {
		layout: 'layout/adminLayout',
		currentUser,
		title: 'today',
		POSITION,
		todayWordStatus: constants.todayWordStatus
	})
}

const todayRequest = async (req, res) => {
	const word = req.body.word;
	const currentUser = await getCurrentUser(req.user.id);
	if (word === '') {
		res.status(400).json({
			message: '빈 항목이 있습니다.'
		});
	} else {
		try {
			await Words.create({ word, AuthorId: currentUser.id, status: TODAYWORD.DRAFTS });
			res.json({
				message: '저장되었습니다'
			}).status(200);
		} catch (error) {
			console.log(error);
			res.status(400).json({
				message: '에러'
			});
		}
	}
}

module.exports = {
	request: {
		getToday: getTodayRequest,
		today: todayRequest
	},
	page: {
		createToday: createTodayPage,
		today: todayPage,
	}
};