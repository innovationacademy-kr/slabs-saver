const { Bookmarks, Article } = require('../../models');
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

const bookmarkPage = async (req, res) => {
  res.render('bookmark/list', { user });
};

module.exports = {
  section: (req, res, next) => {
    res.render('user/bookmark', { title: 'slab-saver', layout: 'layout/userLayout' });
  },
  request: {
    getBookmark: getBookmarkRequest,
    createBookmark: createBookmarkRequest,
  },
  page: {
    bookmark: bookmarkPage,
  },
};
