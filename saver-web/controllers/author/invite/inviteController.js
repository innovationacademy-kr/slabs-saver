
const { Invitation } = require('../../../models');

const getCurrentUser = require('../../../lib/getCurrentUser');
const sendMail = require('../../../lib/sendMail');

const INVITATION = require('../../../lib/constants/invitationState');
const { constants } = require('../../../lib/converter');

// NOTE: state
// state: 0 -> 가입 대기
// state: 1 -> 가입 승인
// state: 2 -> 가입 완료
// state: 3 -> 가입 거절
const decisionRequest = async (req, res) => {
	const { approved, declined, email, select_position, select_category } = req.body;
	if (approved === 1) {
		// 이메일 발송
		const candidate = await Invitation.findOne({ where: { email } });
		const invitationId = candidate.id;
		candidate.state = INVITATION.APPROVAL;
		candidate.position = select_position;
		candidate.category = select_category;
		await sendMail(invitationId, email);
		await candidate.save();
		res.status(200).json({
			result: true,
			message: '가입을 수락했습니다'
		});
	} else if (declined === 1) {
		// 가입거절
		await Invitation.update({ state: INVITATION.REFUSED }, { where: { email } });
		res.status(200).json({
			result: true,
			message: '가입을 거절되었습니다.'
		});
	}
};

const inviteRequest = async (req, res) => {
	const { email, name, category, position } = req.body;
	if (email === '' || name === '' || category === 0 || position === 0) {
		res.status(400).json({
			message: '빈 항목이 있습니다.'
		});
	} else {
		try {
			await Invitation.create({ email, name, category, position, state: INVITATION.APPROVAL });
			const candidate = await Invitation.findOne({ where: { email } });
			const invitationId = candidate.id;
			await sendMail(invitationId, email);
			res.json({
				message: '이메일이 발송되었습니다.'
			}).status(200);
		} catch (error) {
			res.status(400).json({
				message: '이메일이 중복되었습니다.'
			});
		}
	}
};

const inviteListRequest = async (req, res) => {
	const userList = await Invitation.findAll({});
	res.json(userList);
}

const invitePage = async (req, res) => {
	// TODO 페이징 필요
	const userList = await Invitation.findAll({});
	const currentUser = await getCurrentUser(req.user ? req.user.id : null);
	if (!currentUser) res.redirect('/author/login');
	res.render('admin/invitation', { category: constants.category, position: constants.position, categoryJSON: JSON.stringify(constants.category), positionJSON: JSON.stringify(constants.position) });
};

module.exports = {
	request: {
		invite: inviteRequest,
		inviteList: inviteListRequest,
		decision: decisionRequest,
	},
	page: {
		invite: invitePage,
	}
};