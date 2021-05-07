var express = require('express');
var router = express.Router();

/* GET home page. */
// NOTE: 기본 홈 화면
router.get('/', function(req, res, next) {
  res.render('index', { title: '기본 홈 화면' });
});

// NOTE: 설정 화면 페이지
router.get('/profile', function(req, res, next) {
  res.render('index', { title: '설정 화면' });
});

// NOTE: 제보 화면 페이지
router.get('/reporter', function(req, res, next) {
  res.render('index', { title: '제보 화면' });
});

module.exports = router;
