const express = require('express');
const router = express.Router();
const multer = require('multer');
const alert = require('alert');
const authorCtrl = require('../controllers/authorController');
const { Author, Articles } = require('../models');

const articleUploader = multer({ dest: 'public/images/articleImages' });
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
  alert('로그인 페이지로 이동합니다');
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

  // NOTE: 편집회의 페이지
  router.get('/edit-meeting', loggedIn, authorCtrl.getEditMeeting);

  // NOTE: 새 기사 작성 페이지
  router.get('/articles/new', loggedIn, authorCtrl.getNewArticle);

  // TODO: post 문제 없나 확인하기
  // NOTE: 새 기사 작성 요청
  router.post('/articles/new', articleUploader.single('picture'), authorCtrl.newArticle);

  // NOTE: 기사 수정 페이지
  router.get('/articles/edit/:articleId', loggedIn, authorCtrl.getEditArticle);

  // NOTE: 기사 수정 페이지 요청
  router.post('/articles/edit/:articleId', articleUploader.single('picture'), authorCtrl.editArticle);

  // NOTE: 내 기사목록 페이지
  router.get('/articles', loggedIn, authorCtrl.getMyArticles);

  // NOTE: 기사 확인 페이지
  router.get('/articles/preview/:articleId', loggedIn, authorCtrl.checkArticle);
  return router;
};
