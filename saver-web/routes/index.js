const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const userCtrl = require('../controllers/user/userController');

/* GET home page. */
// NOTE: 기본 홈 화면
router.get('/', userCtrl.home);
//NOTE: 검색 결과 화면
router.get('/searchArticles', userCtrl.search);
// NOTE: 추가 기사 요청
router.get('/moreArticles', userCtrl.moreArticles);
router.get('/moreCategoryArticles', authMiddleware, userCtrl.moreCategoryArticles);
router.post('/moreSearchArticles', userCtrl.moreSearchArticles);
// NOTE: 설정 화면 페이지
router.get('/profile', userCtrl.profile);

// NOTE: 제보 화면 페이지
router.get('/reporter', userCtrl.reporter);

// NOTE: 유저 회원가입 페이지
router.get('/signup', userCtrl.signup);

// NOTE: 유저 회원가입 요청
router.post('/signup', userCtrl.requestSignup);

module.exports = router;
