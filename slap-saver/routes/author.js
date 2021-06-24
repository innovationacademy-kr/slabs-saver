const express = require('express');
const router = express.Router();
const authorCtrl = require('../controllers/authorController');
const { s3ImageUpload } = require('../lib/aws/s3Uploader');
const getCurrentUser = require('../lib/getCurrentUser');


// TODO: 모든 url 에 적용하기
const loggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
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
  const currentUser = await getCurrentUser(req.user.id);
  if (currentUser.position !== 4) {
    res.redirect('/author');
  }
  next();
};

module.exports = (passport) => {
  router.get('/', loggedIn, authorCtrl.page.index);

  /**
   * author 로그인
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
  router.post('/signup', alreadyLoggedIn, s3ImageUpload({ folder: 'author' }).single('picture'), authorCtrl.request.signup);
  router.get('/edit-meeting', loggedIn, authorCtrl.page.editMeeting);
  router.get('/mypage', loggedIn, authorCtrl.page.mypage);

  /**
   * 기사 관리
   */
  router.get('/articles/new', loggedIn, authorCtrl.page.newArticle);
  router.get('/articles', loggedIn, authorCtrl.page.myArticle);
  router.get('/articles/:articleId/preview', loggedIn, authorCtrl.page.preview);
  router.get('/articles/edit/:articleId', loggedIn, authorCtrl.page.editArticle);
  router.post('/articles/edit/:articleId', s3ImageUpload({ folder: 'article' }).single('picture'), authorCtrl.request.editArticle);
  router.post('/createArticle', s3ImageUpload({ folder: 'article' }).single('picture'), authorCtrl.request.newArticle);
  router.post('/desk-process', loggedIn, authorCtrl.request.deskProcess);


  /**
   * 기자 관리
   */
  router.get('/pre-signup', alreadyLoggedIn, authorCtrl.page.preSignup);
  router.post('/pre-signup', authorCtrl.request.preSignup);
  router.get('/_admin', loggedIn, checkCode, authorCtrl.page.admin);
  router.get('/_admin/invitation', loggedIn, checkCode, authorCtrl.page.invite);
  router.post('/_admin/invitation', authorCtrl.request.invite);
  router.post('/_admin/inviteList', authorCtrl.request.inviteList);
  router.post('/_admin/decision', authorCtrl.request.decision);

  router.get('/today', loggedIn, authorCtrl.page.today);

  return router;
};
