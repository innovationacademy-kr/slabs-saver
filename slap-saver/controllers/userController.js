const { Article } = require('../models');

module.exports = {
  home: async (req, res, next) => {
    // NOTE: where: { todayNews: true } 인 것을 가져와야한다.
    const todayNews = await Article.findOne({ where: { id: "1" } });
    const todayWords = "helloworld";
    const todayArticlesObj = await Article.findAll({
      where: { category: 'politic' }
    });
    const todayArticles = Array.from(todayArticlesObj).map((todayArticle) => {
      const additionalParagraph = todayArticle.additionalParagraph ? todayArticle.additionalParagraph.split("|-|") : [];
      return {...todayArticle.dataValues, 
        image: `/images/articleImages/${todayArticle.image}`, 
        additionalParagraph: additionalParagraph}
    })
    // NOTE: 오늘의 한마디를 저장한 후 가져와야 한다.
    res.render('index', { title: '기본 홈 화면', todayNews: todayNews,
    todayWords: todayWords,
    todayArticles: todayArticles })
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
  }
};
