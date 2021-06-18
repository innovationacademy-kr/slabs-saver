const alreadyLoggedIn = (req, res, next) => {
	if (req.user) {
		return res.redirect('/author');
	}
	return next();
};
module.exports = { alreadyLoggedIn };