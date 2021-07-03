const getCurrentUser = require('../../../lib/getCurrentUser');
const { Words, TodayWord } = require('../../../models')
const POSITION = require('../../../lib/constants/position');
const TODAYWORD = require('../../../lib/constants/todayWordStatus');
const { constants } = require('../../../lib/converter');

/**
 * 관리자 페이지
 * 기자가 작성한 오늘의 한마디 목록을 조회한다
 */
const getTodayRequest = async (req, res) => {
	const words = await Words.findAll({
		where: {
			AuthorId: req.user.id
		},
		include: {
			model: TodayWord,
			attributes: ['id', 'date']
		}
	});
	res.status(200).json(words);
}

/**
 * 관리자 페이지
 * 오늘의 한마디를 생성한다.
 */
const createTodayPage = async (req, res) => {
	const currentUser = await getCurrentUser(req.user.id);
	res.render('author/today/createToday', {
		layout: 'layout/adminLayout',
		currentUser,
		title: 'today',
		POSITION
	})
}


/**
 * 관리자 페이지
 * 내가 작성한 오늘의 한마디 페이지를 그린다
 */
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

/**
 * 오늘의 한마디를 생성한다.
 */
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
			res.status(200).json({
				message: '저장되었습니다'
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				message: '에러'
			});
		}
	}
}

/**
 * 오늘의 한마디를 수정한다.
 */
const editTodayRequest = async (req,res) => {
	const id = req.body.id;
	const word = req.body.word;
	const status = req.body.status;
	if (word == '')
	{
		res.status(400).json({
			message: '빈 항목이 있습니다'
		});
	}
	else{
		try {
			await Words.update({word, status},{where : {id : id}});
		    res.status(200).json({
			message: '수정 되었습니다'});
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
		today: todayRequest,
		editToday : editTodayRequest,
	},
	page: {
		createToday: createTodayPage,
		today: todayPage,
	}
};