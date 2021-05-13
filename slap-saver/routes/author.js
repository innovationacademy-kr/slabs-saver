const express = require('express');
const multer = require('multer');
const authorCtrl = require('../controllers/authorController');

const router = express.Router();
const upload = multer({ dest: 'public/images/authorImages' });

// NOTE: 기자는 로그인을 하지 않은 상태라면 회원가입, 로그인 페이지를 제외하고는 로그인 페이지로 가야함
// TODO: 모든 url 에 적용하기
const loggedIn = (req, res, next) => {
  if (req.user) {
    console.log('---------------------');
    console.log(`${req.user.email} 은 로그인 한 유저입니다.`);
    console.log('---------------------');
    return next();
  }
  console.log('---------------');
  console.log('로그인 먼저!');
  console.log('---------------');
  return res.redirect('/author/login');
};

const alreadyLoggedIn = (req, res, next) => {
  if (req.user) {
    return res.redirect('/author');
  }
  return next();
};

module.exports = (passport) => {
  router.get('/', loggedIn, authorCtrl.index);

  // NOTE: 로그인 페이지
  router.get('/login', alreadyLoggedIn, authorCtrl.loginPage);

  // NOTE: 로그인 요청
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/author',
      failureRedirect: '/author/login',
    }),
  );

  // NOTE: 로그아웃
  router.get('/logout', authorCtrl.logout);

  // NOTE: 회원가입 페이지
  router.get('/signup', alreadyLoggedIn, authorCtrl.signupPage);

  // NOTE: 회원가입 요청
  router.post('/signup', alreadyLoggedIn, upload.single('picture'), authorCtrl.signup);

  // TODO: Controller 로 리팩토링 진행하기
  // NOTE: 편집회의 페이지
  router.get('/edit-meeting', (req, res, next) => {
    res.render('author/editMeeting', { title: '편집회의 페이지!' });
  });

  // NOTE: 기사 작성 페이지(새 기사)
  router.get('/articles/new', (req, res, next) => {
    res.render('author/newArticle', { title: '기사 작성 페이지!!' });
  });

  router.post('/articles/new', (req, res, next) => {
    res.send(req.body);
  });

  // NOTE: 기사 작성 페이지(수정)
  router.get('/articles/edit', (req, res, next) => {
    res.send(req.body);
  });

  // NOTE: 내 기사목록 페이지
  router.get('/articles', (req, res, next) => {
    res.render('author/articles', { title: '내 기사목록 페이지' });
  });

  // NOTE: 기사 확인 페이지
  router.get('/articles/new/temp', (req, res, next) => {
    res.render('author/checkArticle', { title: '기사 확인 페이지!!!' });
  });

  return router;
};
