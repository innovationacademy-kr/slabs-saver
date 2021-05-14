const { Article } = require('../models');

module.exports = {
  viewDetail: async (req, res, next) => {
    // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
    const article = await Article.findOne({where: {headline: req.params.articleName}});
    article.additionalParagraph = article.additionalParagraph ? article.additionalParagraph.split('|-|') : [];
    res.render('articles/article', { title: req.params.articleId, article: article });
  }
};
