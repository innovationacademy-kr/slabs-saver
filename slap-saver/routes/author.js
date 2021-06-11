const express = require('express');
const router = express.Router();
const multer = require('multer');
const alert = require('alert');
const authorCtrl = require('../controllers/authorController');

const getCurrentUser = require('../lib/getCurrentUser');

const articleUploader = multer({ dest: 'public/images/articleImages' });
const upload = multer({ dest: 'public/images/authorImages' });

// TODO: 모든 url 에 적용하기
const loggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
  alert('로그인 페이지로 이동합니다');
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
    alert('권한이 없습니다.');
    res.redirect('/author');
  }
  next();
};

module.exports = (passport) => {
  router.get('/', loggedIn, authorCtrl.index);

  /**
   * 기자관리
   */
  router.get('/login', alreadyLoggedIn, authorCtrl.loginPage);
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/author',
      failureRedirect: '/author/login',
    }),
  );
  
  router.get('/logout', authorCtrl.logout);
  router.get('/signup', alreadyLoggedIn, authorCtrl.signupPage);
  router.post('/signup', alreadyLoggedIn, upload.single('picture'), authorCtrl.signup);
  router.get('/edit-meeting', loggedIn, authorCtrl.editMeetingPage);

  /**
   * 기사 관리
   */
  router.get('/articles/new', loggedIn, authorCtrl.newArticlePage);
  // TODO: post 문제 없나 확인하기
  router.post('/articles/new', articleUploader.single('picture'), authorCtrl.newArticle);
  router.get('/articles/edit/:articleId', loggedIn, authorCtrl.editArticlePage);
  router.post('/desk-process', loggedIn, authorCtrl.deskProcess);

  // TODO: post인 경우에는 어디서 유저 검사할지 생각하기
  router.post(
    '/articles/edit/:articleId',
    articleUploader.single('picture'),
    authorCtrl.editArticle,
  );
  router.get('/articles', loggedIn, authorCtrl.myArticlePage);
  router.get('/articles/:articleId/preview', loggedIn, authorCtrl.previewPage);


  /**
   * 기자관리
   */

  router.get('/pre-signup', alreadyLoggedIn, authorCtrl.preSignup);
  router.post('/pre-signup', authorCtrl.preSignupRequest);
  router.get('/_admin', loggedIn, checkCode, authorCtrl.admin);
  router.get('/_admin/invitation', loggedIn, checkCode, authorCtrl.invite);
  router.post('/_admin/invitation', authorCtrl.inviteRequest);
  router.post('/_admin/decision', authorCtrl.decision);

  return router;
};
