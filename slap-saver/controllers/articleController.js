const { Article, Author } = require('../models');
const STATUS = require('../lib/constants/articleStatus');
const converter = require('../lib/converter');
const moment = require('moment');
const getCurrentUser = require('../lib/getCurrentUser');

module.exports = {
  viewDetail: async (req, res, next) => {
    // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
    const article = await Article.findOne({
      where: { id: req.params.articleId },
      include: {
        model: Author,
        attributes: ['photo'],
    } });
    if (article.status < STATUS.CONFIRMED) {
      return res.redirect('/');
    }
    const author = await article.getAuthor();
    article.authorImg = `/images/authorImages/${article.Author.photo}`;
    article.image = `/images/articleImages/${article.image}`;
    article.paragraphs = JSON.parse(article.paragraphs);
    article.dataValues.updatedAt = moment(article.updatedAt).format('YYYY.MM.DD HH:mm:ss');
    article.category = converter.category(article.getDataValue('category'));
    res.render('articles/article', { article });
  },
};
