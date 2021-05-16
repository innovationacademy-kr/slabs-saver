const { Article } = require('../models');
const convertCategory = require('../lib/convertCategory');
const moment = require('moment');

module.exports = {
  home: async (req, res, next) => {
    // NOTE: where: { todayArticle: true } 인 것을 가져와야한다.
    const candidateArticle = await Article.findOne({ where: { id: '1' } });
    const todayArticle = candidateArticle ? candidateArticle : { headline: '비어있는 항목입니다.' };
    const todayWords = 'helloworld';
    const AtriclesObj = await Article.findAll({});
    const Articles = await Promise.all(
      AtriclesObj.map(async (article) => {
        const updatedAt = moment(article.updatedAt).format('YYYY.MM.DD HH:mm:ss');
        const additionalParagraph = article.additionalParagraph
          ? article.additionalParagraph.split('|-|')
          : [];
        const { photo } = await article.getAuthor();
        return {
          ...article.dataValues,
          authorImg: `/images/authorImages/${photo}`,
          image: `/images/articleImages/${article.image}`,
          additionalParagraph,
          updatedAt,
          category: convertCategory(article.getDataValue('category')),
        };
      }),
    );
    // NOTE: 오늘의 한마디를 저장한 후 가져와야 한다.
    res.render('index', { title: '기본 홈 화면', todayArticle, todayWords, Articles });
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
