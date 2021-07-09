
const { Author, Article, Invitation } = require('../../../models');

const getCurrentUser = require('../../../lib/getCurrentUser');

const POSITION = require('../../../lib/constants/position');
const STATUS = require('../../../lib/constants/articleStatus');
const { constants } = require('../../../lib/converter');


const newArticleRequest = async (req, res, next) => {
	const {
		body,
		user: { id },
		file
	} = req;
	const { headline, category, imageDesc, imageFrom, briefing, status, paragraphs } = body;
	try {
		const author = await Author.findOne({ where: { id } });
		await author.createArticle({
			headline,
			category,
			imageDesc,
			imageFrom,
			briefing,
			image: file ? file.key : null,
			status,
			paragraphs,
		});
		res.status(200).json({
			result: true,
		})
	} catch (error) {
		res.status(400).json({
			result: true,
			message: '생성실패'
		})
	}
};

const editArticleRequest = async (req, res, next) => {
	const {
		file,
		body,
		params: { articleId },
	} = req;
	const { headline, category, imageDesc, imageFrom, briefing, status, paragraphs } = body;
	console.log({headline, category, imageDesc, imageFrom, briefing, status, paragraphs});
	try {
		await Article.update({
			headline,
			category,
			imageDesc,
			imageFrom,
			briefing,
			image: file ? file.key : undefined, // 이미지를 바꾸는게 아닌이상 해당 컬럼을 업데이트할 필요 없음
			status,
			paragraphs,
		},
		{
			where: { id: articleId },
			individualHooks: true,
		});
		res.status(200).json({
			result: true,
		})
	} catch (error) {
		console.log(error);
		res.status(400).json({
			result: true,
			message: '수정실패' + error.message
		})
	}
};


const deskProcessRequest = async (req, res, next) => {
	// TODO: 로딩 페이지 띄우기
	// TODO: 데스크인 경우와 편집장인 경우 나누기
	// TODO: 데스크가 출고를 off 하고 am7, pm7을 ON 하고 보내면 beforeUpdate 훅에서 에러 발생하게 만들자
	const articles = req.body.articles;
	const currentUser = await getCurrentUser(req.user.id);
	const getRequests = (arr) => arr.map((article) => {
		const request = new Promise((resolve, reject) => {
			try {
				Article.update({
					status: article.status,
					am7: article.am7 ? 1 : 0,
					pm7: article.pm7 ? 1 : 0.
				}, {
					where: { id: article.id }
				}).then(res => {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
		return request;
	});

	if (currentUser.position === POSITION.DESK) {
		const requests = getRequests(articles);
		await Promise.all(requests)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			})
	} else if (currentUser.position > POSITION.DESK) {
		// TODO: 게재 일자도 기사 모델의 칼럼에 추가하자
		// TODO: 편집장이 출고가 안된걸 게재하려고 하면 beforeUpdate 훅에서 에러 발생하게 하자
		// TODO: beforeUpdate 에서 게재가 되었다면 am7, pm7은 off하자
		const requests = getRequests(articles);
		await Promise.all(requests)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			})
	}
	res.status(200).json({ result: '수정 완료' });
};


const newArticlePage = async (req, res, next) => {
	const currentUser = await getCurrentUser(req.user?.id);
	if (!currentUser) return res.redirect('/author/login');
	let defaultCategory = String(currentUser.code)[0];
	if (defaultCategory === '1') {
		defaultCategory = '2';
	}
	res.render('author/newArticle', {
		title: 'new article',
		defaultCategory,
		currentUser,
		category: constants.category,
		POSITION,
		STATUS,
		layout: 'layout/adminLayout'
	});
};

const editArticlePage = async (req, res, next) => {
	const currentUser = await getCurrentUser(req.user?.id);
	try {
		let article = await Article.findOne({ where: { id: req.params.articleId } });
		article.image = `${process.env.S3}/${article.image}`;
		article.briefing = article.briefing;
		console.log(article.briefing);
		return res.render('author/editArticle', {
			article,
			currentUser,
			POSITION,
			STATUS,
			category: constants.category,
			title: 'edit article',
			layout: 'layout/adminLayout'
		});
	} catch (error) {
		console.error(error);
	}
};


const editMeetingPage = async (req, res, next) => {
	const currentUser = await getCurrentUser(req.user ? req.user.id : null);
	res.render('author/editMeeting', { title: 'edit-meeting', currentUser, POSITION });
};

//내 기사 목록
const myArticlePage = async (req, res, next) => {
	const currentUser = await getCurrentUser(req.user ? req.user.id : null);
	const author = await Author.findOne({ where: { id: req.user.id } });
	const articles = await author.getArticles();
	return res.render('author/articles', {
		title: 'my articles',
		articles,
		POSITION,
		currentUser,
		POSITION
	});
};

const previewPage = async (req, res, next) => {
	const article = await Article.findOne({
		where: { id: req.params.articleId },
		include: { model: Author, attributes: ['name', 'photo'] },
	});
	article.authorImg = `${process.env.S3}/${article.Author.photo}`;
	article.image = `${process.env.S3}/${article.image}`;
	res.render('user/article', { title: 'preview', article, POSITION, layout: 'layout/userLayout' });
};

module.exports = {
	request: {
		newArticle: newArticleRequest,
		editArticle: editArticleRequest,
		deskProcess: deskProcessRequest,
	},
	page: {
		newArticle: newArticlePage,
		editArticle: editArticlePage,
		editMeeting: editMeetingPage,
		myArticle: myArticlePage,
		preview: previewPage,
	}
};