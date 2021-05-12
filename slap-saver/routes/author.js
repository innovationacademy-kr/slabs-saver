const express = require('express');
const router = express.Router();
const authorCtrl = require('../controllers/authorController');
const multer = require('multer');

const upload = multer({ dest: 'public/images/authorImages'});

module.exports = function(passport) {
  // NOTE: base: ~~/authors
  router.get('/', authorCtrl.index);

  // NOTE: 로그인 페이지
  router.get('/login', authorCtrl.loginPage);

  // NOTE: 로그인 요청
  router.post('/login', passport.authenticate('local', {
      successRedirect: '/author',
      failureRedirect: '/author/login'
    })
  );

  // NOTE: 회원가입 페이지
  router.get('/signup', authorCtrl.signupPage);

  // NOTE: 회원가입 요청
  router.post('/signup', upload.single('picture'), authorCtrl.signup);

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

  return router
}