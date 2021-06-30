const moment = require('moment');
const { Article, Author } = require('../../models');
const STATUS = require('../../lib/constants/articleStatus');
const converter = require('../../lib/converter');

const detailPage = async (req, res, next) => {
  // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
  const articleRow = await Article.findOne({
    where: { id: req.params.articleId },
    include: { model: Author, attributes: ['name'] },
  });
  const article = articleRow.dataValues;
  if (article.status < STATUS.CONFIRMED) {
    return res.redirect('/');
  }
  article.image = `${process.env.S3}/${articleRow.image}`;
//   article.paragraphs = JSON.parse(articleRow.paragraphs);
  article.updatedAt = moment(articleRow.dataValues.updatedAt).format('YYYY.MM.DD HH:mm:ss').slice(15);
  let category = articleRow.getDataValue('category');
  category = converter.categoryEng(category).toLocaleLowerCase();
  article.category = category;
  res.render('user/article', { title: article.headline, layout: 'layout/userLayout', article });
};

const uploadImageRequest = async (req, res, next) => {
  let data = {
    success: 0
  };
  if (req.file) {
    const { file } = req;

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

