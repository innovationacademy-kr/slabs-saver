var express = require('express');
var router = express.Router();

// NOTE: 유저 로그인 페이지
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '유저 로그인1!' });
});

// NOTE: 유저 회원가입 페이지
router.get('/signup', function(req, res, next) {
  res.render('user/signup', { title: '유저 회원가입!!' });
});

module.exports = router;
