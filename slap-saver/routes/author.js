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
  router.get('/', loggedIn, authorCtrl.page.index);

  /**
   * 기자관리
   */
  router.get('/login', alreadyLoggedIn, authorCtrl.page.login);
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/author',
      failureRedirect: '/author/login',
    }),
  );

  router.get('/logout', authorCtrl.request.logout);
  router.get('/signup', alreadyLoggedIn, authorCtrl.page.signup);
  router.post('/signup', alreadyLoggedIn, upload.single('picture'), authorCtrl.page.signup);
  router.get('/edit-meeting', loggedIn, authorCtrl.page.editMeeting);

  /**
   * 기사 관리
   */
  router.get('/articles/new', loggedIn, authorCtrl.page.newArticle);
  // TODO: post 문제 없나 확인하기
  router.post('/articles/new', articleUploader.single('picture'), authorCtrl.request.newArticle);
  router.get('/articles/edit/:articleId', loggedIn, authorCtrl.page.editArticle);
  router.post('/desk-process', loggedIn, authorCtrl.request.deskProcess);

  // TODO: post인 경우에는 어디서 유저 검사할지 생각하기
  router.post('/articles/edit/:articleId', articleUploader.single('picture'), authorCtrl.request.editArticle);
  router.get('/articles', loggedIn, authorCtrl.page.myArticle);
  router.get('/articles/:articleId/preview', loggedIn, authorCtrl.page.preview);


  /**
   * 기자관리
   */

  router.get('/pre-signup', alreadyLoggedIn, authorCtrl.page.preSignup);
  router.post('/pre-signup', authorCtrl.request.preSignup);
  router.get('/_admin', loggedIn, checkCode, authorCtrl.page.admin);
  router.get('/_admin/invitation', loggedIn, checkCode, authorCtrl.page.invite);
  router.post('/_admin/invitation', authorCtrl.request.invite);
  router.post('/_admin/decision', authorCtrl.request.decision);

  return router;
};
