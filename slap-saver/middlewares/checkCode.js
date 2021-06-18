
const checkCode = async (req, res, next) => {
	if (req.user == null) {
		res.redirect('/author');
	}
	const currentUser = await getCurrentUser(req.user?.id);
	if (currentUser.position !== 4) {
		alert('권한이 없습니다.');
		res.redirect('/author');
	}
	next();
};

module.exports = {checkCode};