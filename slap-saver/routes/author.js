var express = require('express');
var router = express.Router();

/* GET users listing. */
// NOTE: base: ~~/authors
router.get('/', function(req, res, next) {
  res.render('author/index', { title: 'authors!!!' });
});

// NOTE: 로그인 페이지
router.get('/login', function(req, res, next) {
  res.render('author/login', { title: 'login!!!' });
});

// NOTE: 회원가입 페이지
router.get('/signup', function(req, res, next) {
  res.render('author/signup', { title: 'signup!!!' });
});

// NOTE: 편집회의 페이지
router.get('/edit-meeting', function(req, res, next) {
  res.render('author/editMeeting', { title: '편집회의 페이지!' });
});

// NOTE: 기사 작성 페이지(새 기사)
router.get('/articles/new', function(req, res, next) {
  res.render('author/newArticle', { title: '기사 작성 페이지!!' });
});

// NOTE: 기사 작성 페이지(수정)
router.get('/articles/edit', function(req, res, next) {
  res.render('author/editArticle', { title: '기사 수정 페이지!!' });
});

// NOTE: 내 기사목록 페이지
router.get('/articles', function(req, res, next) {
  res.render('author/articles', { title: '내 기사목록 페이지' });
});

// NOTE: 기사 확인 페이지
router.get('/articles/new/temp', function(req, res, next) {
  res.render('author/checkArticle', { title: '기사 확인 페이지!!!' });
});

module.exports = router;
