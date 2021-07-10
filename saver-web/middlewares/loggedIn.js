const loggedIn = (req, res, next) => {
	if (req.user) {
		return next();
	}
	return res.redirect('/author/login');
};
module.exports = { loggedIn };