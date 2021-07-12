
const { Author, Article} = require('../../models');

const { pick } = require('../../lib/util');

const getCurrentUser = require('../../lib/getCurrentUser');
const isEmptyObject = require('../../lib/isEmptyObject');
const converter = require('../../lib/converter');

const CATEGORY = require('../../lib/constants/category');
const POSITION = require('../../lib/constants/position');
const { constants } = require('../../lib/converter');

const articleController = require('./article/articleController');
const authController = require('./auth/authController');
const inviteController = require('./invite/inviteController');
const todayController = require('./today/todayController');


//접속한 기자 구분//
const indexPage = async (req, res) => {
	const currentUser = await getCurrentUser(req.user ? req.user.id : null);
	if (!currentUser) res.redirect('/author/login'); //유저가 없다면 리다이렉션

	const category = isEmptyObject(req.query) || req.query.category === '0' ? CATEGORY.ALL : +req.query.category;

	// 접속한 사람에 따라 보여지는 기사들이 달라짐
	const articles = await Article.findAll({
		where: { category },
		include: { model: Author, attributes: ['id', 'name', 'category'] },
	}); //db에서 사용자 데이터 가져오기
	const { position } = currentUser;
	// 기사, 데스크, 편집장인 경우 보여지는 부분이 있
	if (position === POSITION.ADMIN) {
		res.redirect('/author/_admin');
	} else if (position === POSITION.EXTERNAL_WRITER) {
		res.redirect('/author/articles');
	} else {
		let ejsfile = '';
		let variable;
		const articlesData = JSON.stringify(articles.map((item) => pick(item, ['id', 'pm7', 'am7', 'status'])));
		if ([POSITION.REPOTER, POSITION.INTERN].includes(position)) {
			ejsfile = 'author/desking/index';
		} else if (position === POSITION.DESK) {
			const curr_category = currentUser.category || category;
			currentUser.code = curr_category; // 기사의 코드 === 기사의 카테고리 === 수정가능한 권한을 가짐
			currentUser.category = converter.category(curr_category);
			ejsfile = 'author/desking/desk';
		} else if (position === POSITION.CHIEF_EDITOR) {
			ejsfile = 'author/desking/chiefEditor';
		}
		variable = { title: 'home', articles, currentUser, articlesData, category: constants.category, position: constants.position, POSITION };
		res.render(ejsfile, variable);
	}
};

const adminPage = async (req, res) => {
	const currentUser = await getCurrentUser(req.user ? req.user.id : null);
	if (!currentUser) res.redirect('/author/login');
	res.render('admin/index', { title: 'admin home', currentUser, currentUser, POSITION });
};

const myPage = async (req, res) => {
	const { user } = req;
	const currentUser = await getCurrentUser(req.user.id);
	const { position } = currentUser;
	const viewOption = {
		btn_write: [POSITION.REPOTER, POSITION.DESK].indexOf(position) !== -1,
		btn_today: [POSITION.EXTERNAL_WRITER].indexOf(position) !== -1,
		btn_desking: [POSITION.DESK, POSITION.CHIEF_EDITOR].indexOf(position) !== -1,
		table_myarticle: [POSITION.REPOTER, POSITION.EXTERNAL_WRITER].indexOf(position) !== -1,
		table_editing: [POSITION.REPOTER, POSITION.DESK, POSITION.CHIEF_EDITOR].indexOf(position) !== -1,
		table_memo: [POSITION.REPOTER, POSITION.DESK, POSITION.CHIEF_EDITOR].indexOf(position) !== -1,
	};
	res.render('author/mypage/mypage', {
		layout: 'layout/adminLayout',
		POSITION,
		currentUser,
		viewOption,
		title: 'mypage',
		user
	});
}

module.exports = {
	request: {
		...articleController.request,
		...authController.request,
		...inviteController.request,
		...todayController.request,
	},
	page: {
		index: indexPage,
		admin: adminPage,
		mypage: myPage,
		...articleController.page,
		...authController.page,
		...inviteController.page,
		...todayController.page,
	},
};
