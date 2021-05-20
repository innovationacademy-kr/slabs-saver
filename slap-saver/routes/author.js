const express = require('express');
const router = express.Router();
const multer = require('multer');
const alert = require('alert');
const authorCtrl = require('../controllers/authorController');

const getCurrentUser = require('../lib/getCurrentUser');

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

const checkCode = async (req, res, next) => {
  if (req.user == null) {
    res.redirect('/author');
  }
  const currentUser = await getCurrentUser(req.user?.id);
  if (currentUser.position !== 4) {
    // NOTE: confirm이 더 낫나?
    alert('권한이 없습니다.');
    res.redirect('/author');
  }
  next();
};

module.exports = (passport) => {
  router.get('/', loggedIn, authorCtrl.index);

  router.post('/desk-process', loggedIn, authorCtrl.deskProcess);

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
  router.get('/edit-meeting', loggedIn, authorCtrl.editMeetingPage);

  // NOTE: 새 기사 작성 페이지
  router.get('/articles/new', loggedIn, authorCtrl.newArticlePage);

  // TODO: post 문제 없나 확인하기
  // NOTE: 새 기사 작성 요청
  router.post('/articles/new', articleUploader.single('picture'), authorCtrl.newArticle);

  // NOTE: 기사 수정 페이지
  router.get('/articles/edit/:articleId', loggedIn, authorCtrl.editArticlePage);

  // TODO: post인 경우에는 어디서 유저 검사할지 생각하기
  // NOTE: 기사 수정 페이지 요청
  router.post(
    '/articles/edit/:articleId',
    articleUploader.single('picture'),
    authorCtrl.editArticle,
  );

  // NOTE: 내 기사목록 페이지
  router.get('/articles', loggedIn, authorCtrl.myArticlePage);

  // NOTE: 기사 확인 페이지
  router.get('/articles/preview/:articleId', loggedIn, authorCtrl.previewPage);

  // NOTE: 신원인증
  router.get('/pre-signup', alreadyLoggedIn, authorCtrl.preSignup);

  // NOTE: 신원인증 요청
  router.post('/pre-signup', authorCtrl.preSignupRequest);

  // NOTE: admin 페이지
  router.get('/_admin', loggedIn, checkCode, authorCtrl.admin);

  router.get('/_admin/invitation', loggedIn, checkCode, authorCtrl.invite);

  router.post('/_admin/invitation', authorCtrl.inviteRequest);

  return router;
};
