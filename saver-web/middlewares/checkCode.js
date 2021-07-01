const getCurrentUser = require('../lib/getCurrentUser')
const checkCode = async (req, res, next) => {
	if (req.user == null) {
		res.redirect('/author');
	}
	const currentUser = await getCurrentUser(req.user?.id);
	if (currentUser.position !== 4) {
		res.redirect('/author');
	}
	next();
};

module.exports = {checkCode};