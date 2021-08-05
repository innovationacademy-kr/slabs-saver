const moment = require('moment');
const { Article, Author } = require('../../models');
const converter = require('../../lib/converter');

module.exports = {
  home: async (req, res, next) => {
    res.render('user/index', { title: 'slab-saver', layout: 'layout/userLayout' });
  },

/**
 * 무한스크롤에 넘기는 데이터
 */

  moreArticles: async (req, res, next) => {
    const { page } = req.body;
    const articles = await Article.findAll({
      where: { status: 4 },
      order: [['publishedAt', 'DESC']],
      offset: +page,
      limit: 3,
      include: { model: Author, attributes: ['photo', 'name'] },
    });
    const data = articles.map(article => {
		const updatedAt = moment(article.updatedAt).format('YYYY-MM-DD HH:mm:ss').slice(0, 16).replace(/\-/gi, '.');
		const publishedAt = moment(article.publishedAt).format('YYYY-MM-DD HH:mm:ss').slice(0, 16).replace(/\-/gi, '.');
      return {
        ...article.dataValues,
        image: process.env.S3 + '/' + article.image,
		updatedAt,
    publishedAt,
		category: converter.categoryEng(article.getDataValue('category')).toLocaleLowerCase(),
      }
    });
    res.send(JSON.stringify(data));
  },

  profile: (req, res, next) => {
    res.render('index', { title: '설정 화면' });
  },

  reporter: (req, res, next) => {
    res.render('index', { title: '제보 화면' });
  },

  signup: (req, res, next) => {
    res.render('signup', { title: '유저 회원가입!!' });
  },

  requestSignup: (req, res, next) => {
    res.send(req.body);
  },
};
