const getCurrentUser = require('../../../lib/getCurrentUser');
const { Author, Article, Words, TodayWord, TodayArticle } = require('../../../models')
const articleStatus = require('../../../lib/constants/articleStatus');
const moment = require('moment');
const POSITION = require('../../../lib/constants/position');
const TODAYWORD = require('../../../lib/constants/todayWordStatus');
const { constants } = require('../../../lib/converter');
const Sequelize = require('sequelize');
const { json } = require('sequelize');
const Op = Sequelize.Op;

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
const todayPageDesking = async (req, res) => {
	const currentUser = await getCurrentUser(req.user.id);
	let words = await Words.findAll({
		attributes: ['id', 'word', 'status','createdAt'],
		include:[
			{
				model: Author,
				attributes: ['id', 'name']
			},
			{
				model: TodayWord,
				attributes: ['id', 'date']
			},
		],
		where:{
			status:{
      			[Op.or]: [2, 3]
    		}
		}
	});


	//note : sequelizer 객체의 dataValues에 접근해야 값 수정 변형 가능
	words = words.map((item) => {
		item = item.get({plain: true})
		//note: sequelizer 객체의 dataValues의 값만 가져옴
		if (item.TodayWord){
			item.TodayWord.date = moment(item.TodayWord.date).format('YYYY-MM-DD');
		} else {
			item.TodayWord = { date: "" };
		}
		return item;
	});
	res.render('author/today/todaywordDesking', {
		layout: 'layout/adminLayout',
		POSITION,
		currentUser,
		words,
		title: 'todayDesking',
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
 * 오늘의 한마디 수정페이지
 */
const editTodayPage = async (req, res) => {
	const articleId = req.query.id;
	const currentUser = await getCurrentUser(req.user.id);
	let word;
	try{
		const contents = await Words.findOne({where :{id : articleId}})
		word = contents.word;
	}
	catch (error){
		console.log(error);
	}
	res.render('author/today/editToday', {
		layout: 'layout/adminLayout',
		currentUser,
		title: 'today',
		word: word,
		POSITION
	})
}

/*
 * 오늘의 한마디 생성
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
			res.status(400).json({
				message: error.message
			});
		}
	}
}


/**
 * 오늘의 한마디 수정
 */
const editTodayRequest = async (req,res) => {
	const id = req.body.id;
	const word = req.body.word;
	const status = req.body.status;
	if (word == '')
	{
		res.status(400).json({
			message: '빈 항목이 있습니다'
		});
	}
	else{
		try {
			await Words.update({word, status},{where : {id : id}});
		    res.status(200).json({
			message: '수정 되었습니다'});
		} catch (error) {
			console.error(error);
			res.status(400).json({
				message: error.message
			});
		}
	}
}

/**
 * 오늘의 기사 데스킹
 */
const todayArticleDeskingPage = async (req, res) => {
	const currentUser = await getCurrentUser(req.user.id);
	let articles = await Article.findAll({
		attributes: ['id', 'headline', 'createdAt'],
		where: {
			status: articleStatus.CONFIRMED
		},
		include: [
			{
				model: TodayArticle,
				attributes: ['id', 'date'],
				order: ['date'],
			},
			{
				model: Author,
				attributes: ['id', 'name']
			},
		]

	});

	articles = articles.map(article => {
		article = article.get({ plain: true })
		if (article.TodayArticle) {
			article.TodayArticle.date = moment(article.TodayArticle.date).format('YYYY-MM-DD');
		} else {
			article.TodayArticle = { date: '' };
		}
		return article;
	})

	res.render('author/todayArticle/todayArticleDesking', {
		layout: 'layout/adminLayout',
		currentUser,
		title: 'today',
		POSITION,
		articles,
		articleStatus: constants.articleStatus
	})
}

/**
 * 오늘의 기사 데스킹 업데이트
 */
const todayArticleDeskingRequest = async (req, res, next) => {
	const { articles } = req.body;
	const reqs = articles.map(article => {
		const { id: TodayArticleId, date } = article.TodayArticle;
		if (TodayArticleId) {
			// 기존에 존재하는 오늘의 기사이므로 update
			if (date) {
				return TodayArticle.update({ date }, { where: { id: TodayArticleId } })
			} else {
				return TodayArticle.destroy({ where: { id: TodayArticleId }})
			}
		} else {
			// 새로운 오늘의 기사 생성
			return TodayArticle.create({ date, ArticleId: article.id });
		}
	})

	// 모든 비동기요청 배열을  all로 모두 실행함
	Promise.all(reqs).then(result => {
		res.status(200).json({result: true})
	}).catch(err => {
		res.status(400).json({ result: false, messge: err.message })
	})
}


const todayRequestDesking = async (req, res) => {
	const data = req.body.words;
	for (var i = 0; i < data.length; i++) {
		const id = await TodayWord.findOne({ where: { wordId: data[i].id } })
		if (id === null) {
			try {
				await TodayWord.create({
					WordId: data[i].id,
					date: data[i].TodayWord.date,
				})
			} catch (error) {
				console.error(error);
				res.status(400).json({
					message: '에러'
				});
			}
		} else {
			if (data[i].TodayWord.date != '') {
				try {
					await TodayWord.update({
						date: data[i].TodayWord.date
					},
						{
							where: { wordId: data[i].id }
						});
				} catch (error) {
					console.error(error);
					res.status(400).json({
						message: '에러'
					});
				}
			}
			else {
				try {
					await TodayWord.destroy({
						where: { wordId: data[i].id }
					});
				} catch (error) {
					console.error(error);
					res.status(400).json({
						message: '에러'
					});
				}
			}
		}
	}
	res.status(200).json({
		message: '성공'
	});
}

module.exports = {
	request: {
		getToday: getTodayRequest,
		today: todayRequest,
		editToday : editTodayRequest,
		todayArticleDesking: todayArticleDeskingRequest,
		todayDesk:todayRequestDesking
	},
	page: {
		editToday: editTodayPage,
		createToday: createTodayPage,
		today: todayPage,
		todayArticleDesking: todayArticleDeskingPage,
		todayDesk: todayPageDesking
	}
};
