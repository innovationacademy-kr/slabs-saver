const { Bookmark } = require('../../models');

const getBookmarkRequest = async (req, res) => {
	const user = req.user;
	const page = req.query.page;
	const bookmark = new Bookmark.find({ where: { User_id: user.id }})
	try {
		res.status(200).json({
			bookmark
		})
	} catch (error) {
		res.status(400).json({
			bookmark
		})
	}
}

const createBookmarkRequest = async (req, res) => {
	const user = req.user;
	const bookmark = new Bookmark.find({ where: { User_id: user.id } });
	const articleId = req.params.id;

	try {
		const result = await Bookmark.create({
			User_id: user.id,
			Article_id: articleId,
		});
		res.status(200).json({
			bookmark
		})
	} catch (error) {
		res.status(400).json({
			bookmark
		})
	}
}

const bookmarkPage = async (req, res) => {
	res.render('bookmark/list', {user})
}

module.exports = {
	request: {
		getBookmark: getBookmarkRequest,
		createBookmark: createBookmarkRequest
	},
	page: {
		bookmark: bookmarkPage,
	},
};
