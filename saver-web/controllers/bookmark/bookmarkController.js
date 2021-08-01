const { Bookmarks } = require('../../models');

const getBookmarkRequest = async (req, res) => {
  const page = req.query.page;
  const bookmark = new Bookmarks.findAll({ where: { UserId: req.decoded.userId } });
  try {
    res.status(200).json({
      bookmark,
    });
  } catch (error) {
    res.status(400).json({
      bookmark,
    });
  }
};

const createBookmarkRequest = async (req, res) => {
  const articleId = req.params.id;
  const bookmark = await Bookmarks.findAll({
    where: { UserId: req.decoded.userId, ArticleId: articleId },
  });
  if (Object.keys(bookmark).length != 0) {
    res.status(200).json({
      success: true,
      bookmark,
    });
    return;
  }
  try {
    const result = await Bookmarks.create({
      UserId: req.decoded.userId,
      ArticleId: articleId,
    });
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const deleteBookmarkRequest = async (req, res) => {
  const articleId = req.params.id;
  const bookmark = await Bookmarks.findAll({
    where: { UserId: req.decoded.userId, ArticleId: articleId },
  });

  if (Object.keys(bookmark).length == 0) {
    res.status(400).json({
      success: false,
      message: '북마크 상태가 아닙니다.'
    });
    return;
  }
  try {
    const result = await Bookmarks.destroy({
      where: {
          UserId: req.decoded.userId,
          ArticleId: articleId,
      },
    });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const bookmarkPage = async (req, res) => {
  res.render('bookmark/list', { user });
};

const checkBookmarkRequest = async (req, res) => {
  const articleId = req.params.id;
  let result;
  try{
    const bookmark = await Bookmarks.findAll({
      where: { UserId: req.decoded.userId, ArticleId: articleId },
    });

    if (Object.keys(bookmark).length != 0) result = true;
    else result = false;

    res.status(200).json({
      success: true,
      result: result
    });
  } catch (error){
    res.status(400).json({
      success: false,
      error
    });
  }

}

module.exports = {
  section: (req, res, next) => {
		res.render('user/bookmark', { title : 'slab-saver', layout: 'layout/userLayout' });
	},
  request: {
    getBookmark: getBookmarkRequest,
    createBookmark: createBookmarkRequest,
    deleteBookmark: deleteBookmarkRequest,
    checkBookmark: checkBookmarkRequest
  },
  page: {
    bookmark: bookmarkPage,
  }
};
