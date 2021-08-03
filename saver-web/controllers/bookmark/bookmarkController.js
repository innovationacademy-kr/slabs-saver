const { Bookmarks, Article, Alarm } = require('../../models');
const sequelize = require('../../models').sequelize;

const getBookmarkRequest = async (req, res) => {
  const page = req.query.page;
  const bookmark = await Bookmarks.findAll({
    where: { UserId: req.decoded.userId },
    include: [
      {
        model: Article,
        as: 'Article',
        attributes: [
          [sequelize.fn('date_format', sequelize.col('publishedAt'), '%Y.%m.%d'), 'date'],
          'category',
          'headline',
        ],
      },
    ],
    order: [
      [sequelize.fn('date_format', sequelize.col('Article.publishedAt'), '%Y.%m.%d'), 'DESC'],
      ['Article', 'category', 'DESC'],
      ['Article', 'publishedAt', 'DESC'],
    ],
    offset: page * 20,
    limit: 20,
  });
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

    //임시로 알람db도 같이저장
      await Alarm.create({
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
    res.render('user/bookmark', { title: 'slab-saver', layout: 'layout/userLayout' });
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
