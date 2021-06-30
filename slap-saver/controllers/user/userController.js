const moment = require('moment');
const { Article, Author } = require('../../models');
const converter = require('../../lib/converter');

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
        const updatedAt = moment(article.updatedAt).format('YYYY-MM-DD HH:mm:ss').slice(0, 16).replace(/\-/gi, '.');
        return {
          ...article.dataValues,
          authorImg: `${process.env.S3}/author/${article.Author.photo}`,
          image: `${process.env.S3}/${article.image}`,
          updatedAt,
          category: converter.categoryEng(article.getDataValue('category')).toLocaleLowerCase(),
        };
      }),
    );
    // NOTE: 오늘의 한마디를 저장한 후 가져와야 한다.
    const briefings = JSON.stringify(Articles.map(article => ({
      briefing: JSON.parse(article.briefing),
      id: article.id
    })))
    res.render('user/index', { title: 'slab-saver', layout: 'layout/userLayout', todayArticle, todayWords, Articles, briefings });
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
    const data = articles.map(article => {
      return {
        ...article.dataValues,
        image: process.env.S3 + '/' + article.image
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
