const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/userController');

/* GET home page. */
// NOTE: 기본 홈 화면
router.get('/', userCtrl.home);

// NOTE: 설정 화면 페이지
router.get('/profile', userCtrl.profile);

// NOTE: 제보 화면 페이지
router.get('/reporter', userCtrl.reporter);

// NOTE: 유저 로그인 페이지
router.get('/login', userCtrl.login);

// NOTE: 유저 로그인 요청
router.post('/login', userCtrl.requestLogin);

// NOTE: 유저 회원가입 페이지
router.get('/signup', userCtrl.signup);

// NOTE: 유저 회원가입 요청
router.post('/signup', userCtrl.requestSignup);

module.exports = router;
