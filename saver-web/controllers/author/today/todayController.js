const getCurrentUser = require('../../../lib/getCurrentUser');
const { Words } = require('../../../models')
const POSITION = require('../../../lib/constants/position');

const getTodayRequest = async (req, res) => {
	console.log({Words});
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
		POSITION
	})
}

module.exports = {
	request: {
		getToday: getTodayRequest
	},
	page: {
		createToday: createTodayPage,
		today: todayPage,
	}
};