const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const bookmarkCtrl = require('../controllers/bookmark/bookmarkController');

// 북마크
router.get('/article', authMiddleware, bookmarkCtrl.page.bookmark);
router.get('/more', authMiddleware, bookmarkCtrl.request.getBookmark);
router.post('/:id', authMiddleware, bookmarkCtrl.request.createBookmark);

module.exports = router;
