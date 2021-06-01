const moment = require('moment');
const { Article, Author } = require('../models');
const converter = require('../lib/converter');

module.exports = {
  home: async (req, res, next) => {
    // TODO: where: { todayArticle: true } 인 것을 가져와야한다.
    const candidateArticle = await Article.findOne({ where: { status: 4 } });
    const todayArticle = candidateArticle || { headline: '비어있는 항목입니다.' };
    // TODO: todayWords 기능 추가해야함
    const todayWords = 'Hello World';
    const ARTICLE_LIMIT = 3;
    const ArticlesObj = await Article.findAll({
      where: { status: 4 },
      order: [['updatedAt', 'DESC']],
      limit: ARTICLE_LIMIT,
      include: { model: Author, attributes: ['photo', 'name'] },
    });
    const Articles = await Promise.all(
      ArticlesObj.map(async (article) => {
        const updatedAt = moment(article.updatedAt).format('YYYY.MM.DD HH:mm:ss');
        return {
          ...article.dataValues,
          authorImg: `/images/authorImages/${article.Author.photo}`,
          image: `/images/articleImages/${article.image}`,
          updatedAt,
          category: converter.category(article.getDataValue('category')),
        };
      }),
    );
    // NOTE: 오늘의 한마디를 저장한 후 가져와야 한다.
    res.render('index', { title: 'slab-saver', todayArticle, todayWords, Articles });
  },

  moreArticles: async (req, res, next) => {
    const { page } = req.query;
    const articles = await Article.findAll({
      where: { status: 4 },
      order: [['updatedAt', 'DESC']],
      offset: +page,
      limit: 3,
      include: { model: Author, attributes: ['photo', 'name'] },
    });
    res.send(JSON.stringify(articles));
  },

  profile: (req, res, next) => {
    res.render('index', { title: '설정 화면' });
  },

  reporter: (req, res, next) => {
    res.render('index', { title: '제보 화면' });
  },

  login: (req, res, next) => {
    res.render('login', { title: '유저 로그인1!' });
  },

  requestLogin: (req, res, next) => {
    res.send(req.body);
  },

  signup: (req, res, next) => {
    res.render('signup', { title: '유저 회원가입!!' });
  },

  requestSignup: (req, res, next) => {
    res.send(req.body);
  },
};
