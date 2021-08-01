const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const bookmarkCtrl = require('../controllers/bookmark/bookmarkController');

// 북마크
router.get('/article', authMiddleware, bookmarkCtrl.page.bookmark);
router.get('/more', authMiddleware, bookmarkCtrl.request.getBookmark);
router.get('/:id', authMiddleware, bookmarkCtrl.request.checkBookmark);
router.post('/:id', authMiddleware, bookmarkCtrl.request.createBookmark);
router.delete('/:id', authMiddleware, bookmarkCtrl.request.deleteBookmark);

// 북마크페이지 연결
router.get('/', bookmarkCtrl.section);

module.exports = router;
