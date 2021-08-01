const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const subscriberCtrl = require('../controllers/subscriber/subscriberController');
const bookmarkCtrl = require('../controllers/bookmark/bookmarkController');

// 로그인, 회원가입
router.get('/signup', subscriberCtrl.page.signup);
router.get('/login', subscriberCtrl.page.login);
router.post('/signup', subscriberCtrl.request.signup);
router.post('/login', subscriberCtrl.request.login);

// 북마크
router.get('/bookmark', authMiddleware, bookmarkCtrl.page.bookmark);
router.get('/moreBookmark', authMiddleware, bookmarkCtrl.request.getBookmark);
router.post('/bookmark/:id', authMiddleware, bookmarkCtrl.request.createBookmark);

module.exports = router;
