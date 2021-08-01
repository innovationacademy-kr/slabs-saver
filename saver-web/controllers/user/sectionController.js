const moment = require('moment');
const { Article, Author } = require('../../models');
const converter = require('../../lib/converter');

const getSectionRequest = async (req, res) => {
	 const userEmail = req.decoded.userEmail;
	 const userId = req.decoded.userId;

	console.log("userEmail =" + userEmail + "  userid = "+ userId);
	res.status(200).json(userId);
}

const sectionPage = (req, res, next) => {
	res.render('user/section', { title : 'slab-saver', layout: 'layout/userLayout'});
}

const loginedSection = (req, res, next) => {
	res.render('user/loginedSection', { title : 'slab-saver', layout: 'layout/userLayout'});
}

module.exports = {
	request: {
		getSection: getSectionRequest,
		// insertSection: insertSectionRequest
	},
	page: {
		section: sectionPage,
		logined: loginedSection,
	},
};
