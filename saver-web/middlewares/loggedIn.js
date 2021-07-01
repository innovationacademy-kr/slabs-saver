const loggedIn = (req, res, next) => {
	console.log('loggedIn', req.user);
	if (req.user) {
		return next();
	}
	return res.redirect('/author/login');
};
module.exports = { loggedIn };