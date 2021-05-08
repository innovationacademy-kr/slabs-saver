var express = require('express');
var router = express.Router();

/* GET users listing. */
// NOTE: base: ~~/authors
router.get('/', function(req, res, next) {
  res.render('author/index', { title: 'authors!!!' });
});

// NOTE: 로그인 페이지
router.get('/login', function(req, res, next) {
  // NOTE: render: 무언가를 그려준다. context -> 상태
  res.render('author/login', { title: 'login!!!' });
});

// NOTE: 로그인 요청
router.post('/login', function(req, res, next) {
  // NOTE: 그냥 데이터를 클라이언트한테 보낸다. 그러면 브라우저가 자기가 알아서 클라이언트한테 보여준다. ft_write
  res.send(req.body);
})

// NOTE: 회원가입 페이지
router.get('/signup', function(req, res, next) {
  res.render('author/signup', { title: 'signup!!!' });
});


// NOTE: 회원가입 요청
router.post('/signup', function(req, res, next) {
  res.send(req.body);
});

// NOTE: 편집회의 페이지
router.get('/edit-meeting', function(req, res, next) {
  res.render('author/editMeeting', { title: '편집회의 페이지!' });
});

// NOTE: 기사 작성 페이지(새 기사)
router.get('/articles/new', function(req, res, next) {
  res.render('author/newArticle', { title: '기사 작성 페이지!!' });
});

router.post('/articles/new', function(req, res, next) {
  res.send(req.body);
})

// NOTE: 기사 작성 페이지(수정)
router.get('/articles/edit', function(req, res, next) {
  res.send(req.body);
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
