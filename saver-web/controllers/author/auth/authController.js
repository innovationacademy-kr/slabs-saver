const { Author,Invitation } = require('../../../models');

const INVITATION = require('../../../lib/constants/invitationState');
const POSITION = require('../../../lib/constants/position');
const { constants } = require('../../../lib/converter');

const logoutRequest = async (req, res) => {
	if (req.user) {
		req.logout();
		req.session.save(() => {
			return res.redirect('/author');
		});
	} else {
		res.redirect('/author');
	}
};

const signupRequest = async (req, res) => {
	const { email, password, confirm, name, code, contact, position, category } = req.body;
	const photo = req.file ? req.file.key : null;
	if (password !== confirm) {
		res.json({
			result: false,
			message: '재입력한 비밀번호가 일치하지 않습니다.',
		})
			.status(400);
	}
	// TODO: Author Service 객체 만들어서 추상화하기
	try {
		await Author.create({ email, password, name, code, position, contact, photo, category });
		await Invitation.update({ state: INVITATION.COMPLETE }, { where: { email } });
		res.json({
			result: true,
			message: '',
		})
			.status(200);
	} catch (error) {
		res.json({
			result: false,
			message: `오류가 발생하였습니다 (${error.message})`,
		})
			.status(400);
	}
};

const preSignupRequest = async (req, res) => {
	const { email, name } = req.body;
	try {
		await Invitation.create({ email, name });
	} catch (error) {
		if (error.errors) {
			res.status(400).json({
				error: e.message
			})
		} else {
			res.status(400).json({
				error: '알 수 없는 에러 발생'
			})
		}
		return res.redirect('/author/pre-signup');
	}
	return res.redirect('/author/login');
};


const preSignupPage = async (req, res) => {
	res.render('author/preSignup', { title: 'signup request', POSITION });
};

const loginPage = async (req, res) => {
	res.render('author/login', { title: 'login', layout: 'layout/adminLayout' });
};

const signupPage = async (req, res) => {
	const { id } = req.query;
	if (!id) {
		return res.redirect('/author/pre-signup');
	}
	const candidate = await Invitation.findOne({ where: { id } });
	if (candidate === null || candidate.state !== 1) {
		return res.redirect('/author/pre-signup');
	}
	const { email, name, code, position, category } = candidate;
	const user = { email, name, code, position, category };
	const POSITION = constants.positionKey;
	res.render('author/signup', { title: 'signup', layout: 'layout/adminLayout', user, userJson: JSON.stringify(user), POSITION });
};


module.exports = {
	request: {
		logout: logoutRequest,
		signup: signupRequest,
		preSignup: preSignupRequest,
	},
	page: {
		preSignup: preSignupPage,
		signup: signupPage,
		login: loginPage,
	}
};