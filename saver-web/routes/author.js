const express = require('express');
const router = express.Router();
const authorCtrl = require('../controllers/author/authorController');
const { s3ImageUpload } = require('../lib/aws/s3Uploader');
const { loggedIn } = require('../middlewares/loggedIn');
const { alreadyLoggedIn } = require('../middlewares/alreadyLoggedIn');
const { checkCode } = require('../middlewares/checkCode');

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

/**
 * 외부 필진
 */
  router.get('/today/new', loggedIn, authorCtrl.page.createToday);
  router.get('/today', loggedIn, authorCtrl.page.today);
  router.get('/today/my', loggedIn, authorCtrl.request.getToday);
  router.get('/todaydesking', loggedIn, authorCtrl.page.todayDesk)
  router.post('/today/new',authorCtrl.request.today);
  router.post('/todaydesking',authorCtrl.request.todayDesk);
  router.get('/today/edit',authorCtrl.page.editToday)
  router.post('/today/edit',authorCtrl.request.editToday);
  return router;
};
