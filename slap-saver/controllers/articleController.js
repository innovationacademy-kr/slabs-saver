const moment = require('moment');
const { Article, Author } = require('../models');
const STATUS = require('../lib/constants/articleStatus');
const converter = require('../lib/converter');

module.exports = {
  viewDetail: async (req, res, next) => {
    // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
    const articleRow = await Article.findOne({
      where: { id: req.params.articleId },
      include: { model: Author, attributes: ['name'] },
    });
    const article = articleRow.dataValues;
    if (article.status < STATUS.CONFIRMED) {
      return res.redirect('/');
    }

    //article.authorImg = `/images/authorImages/${articleRow.Author.photo}`;
    article.image = `/images/articleImages/${articleRow.image}`;
    article.paragraphs = JSON.parse(articleRow.paragraphs);
    article.updatedAt = moment(articleRow.dataValues.updatedAt).format('YYYY.MM.DD HH:mm:ss').slice(15);
    let category = articleRow.getDataValue('category');
    category = converter.categoryEng(category).toLocaleLowerCase();
    article.category = category;
    console.log("article.paragraphs " ,article.paragraphs);
    res.render('user/article',  { title: article.headline, layout: 'layout/userLayout', article });
  },
};
