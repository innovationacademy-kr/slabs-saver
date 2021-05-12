const { Author } = require('../models');

module.exports = {
  index: (req, res, next) => {
    res.render('author/index', { title: 'authors!!!' });
  },
  loginPage: (req, res, next) => {
    res.render('author/login', { title: 'login!!!' });
  },

  logout: (req, res, next) => {
    if (req.user) {
      console.log('---------------------------------------')
      console.log('로그아웃 성공')
      console.log('---------------------------------------')
      req.logout();
    } else {
      console.log('-------- 로그인을 먼저 해주세요!! -----------')
      console.log('로그인 한 상태가 아님')
      console.log('---------------------------------------')
    }
    res.redirect('/author');
  },
  
  signupPage: (req, res, next) => {
    res.render('author/signup', { title: 'author page' });
  },

  signup: async (req, res, next) => {
    const { email, password, confirm, contact } = req.body;
    const photo = req.file ? req.file.filename : null;
    if (password !== confirm) {
      return res.redirect('/author/signup');
    }
    try {
      await Author.create({ email, password, contact, photo })
    } catch ({errors}) {
      console.log('------- error message --------');
      errors.forEach((e) => {
        console.log(e.message)
      })
      console.log('------------------------------');
      return res.redirect('/author/signup');
    }
    return res.redirect('/login');
  },
};
