const alert = require('alert');
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
      alert('비밀번호가 같지 않습니다.');
      return res.redirect('/author/signup');
    }
    // TODO: Author Service 객체 만들어서 추상화하기
    try {
      await Author.create({ email, password, contact, photo })
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((e) => {
          alert(e.message);
        })
      } else {
        alert('알 수 없는 에러 발생');
      }
      return res.redirect('/author/signup');
    }
    return res.redirect('/login');
  },
};
