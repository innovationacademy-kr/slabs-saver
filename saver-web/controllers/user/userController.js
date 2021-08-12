const moment = require('moment');
const { Article, Author, Subscriber } = require('../../models');
const converter = require('../../lib/converter');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  home: async (req, res, next) => {
    res.render('user/index', { title: 'slab-saver', layout: 'layout/userLayout' });
  },

/**
 * 무한스크롤에 넘기는 데이터
 */

  moreArticles: async (req, res, next) => {
    const { page } = req.query;
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

  moreCategoryArticles: async (req, res, next) => {
    const { page } = req.query;
    const userId = req.decoded.userId;
    const User = await Subscriber.findOne({ where:{id: userId}});
    const userFollowingCategory = User.followingCategories.split(',').map(Number);
    const categoryArticles = await Article.findAll({
      where: {
        status: 4, 
        category: {
         [Op.or]: userFollowingCategory
        }
     },
     order: [['publishedAt', 'DESC']],
     offset: +page,
     limit: 3,
     include: { model: Author, attributes: ['photo', 'name'] },
    });
    const data = categoryArticles.map(article => {
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
