const moment = require('moment');
const { Article, Author } = require('../models');
const STATUS = require('../lib/constants/articleStatus');
const converter = require('../lib/converter');

const detailPage = async (req, res, next) => {
  // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
  const article = await Article.findOne({
    where: { id: req.params.articleId },
    include: { model: Author, attributes: ['photo'] },
  });
  if (article.status < STATUS.CONFIRMED) {
    return res.redirect('/');
  }
  article.authorImg = `/images/authorImages/${article.Author.photo}`;
  article.image = `/images/articleImages/${article.image}`;
  article.paragraphs = JSON.parse(article.paragraphs);
  article.dataValues.updatedAt = moment(article.updatedAt).format('YYYY.MM.DD HH:mm:ss');
  article.category = article.getDataValue('category');
  res.render('articles/article', { title: article.headline, article });
};

const uploadImageRequest = async (req, res, next) => {
  console.log("===============")
  console.log(req.body)
  console.log("===============")
  console.log(req.file)
  console.log("====== file =========")
  let data = {
    success: 0
  };
  if (req.file) {
    const {file} = req;

    data.success = 1;
    data.file = {
      url: file.location,
      name: file.key,
      size: file.size
    };
    res.status(200).json(data);
  } else {
    res.status(400).json(data);
  }
}

module.exports = {
  page: {
    detail: detailPage,
  },
  request: {
    uploadImage: uploadImageRequest
  }
};

