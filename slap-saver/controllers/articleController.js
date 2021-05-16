const { Article } = require('../models');
const moment = require('moment');

module.exports = {
  viewDetail: async (req, res, next) => {
    // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
    const article = await Article.findOne({ where: { id: req.params.articleId } });
    const author = await article.getAuthor();
    article.additionalParagraph = article.additionalParagraph
      ? article.additionalParagraph.split('|-|')
      : [];
    article.authorImg = `/images/authorImages/${author.photo}`;
    article.image = `/images/articleImages/${article.image}`;
    article.dataValues.updatedAt = moment(article.updatedAt).format('YYYY.MM.DD HH:mm:ss');
    res.render('articles/article', { article });
  },
};
