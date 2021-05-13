module.exports = {
  home: (req, res, next) => {
    res.render('index', { title: '기본 홈 화면' }
  )},

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
