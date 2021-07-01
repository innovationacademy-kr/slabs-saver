const express = require('express');
const articleCtrl = require('../controllers/article/articleController');
const router = express.Router();

const { s3ImageUpload } = require('../lib/aws/s3Uploader');

// NOTE: 기사 상세 화면
router.get('/detail/:articleId', articleCtrl.page.detail);
router.post('/upload/image', s3ImageUpload({ folder: 'article' }).single('image'), articleCtrl.request.uploadImage)

module.exports = router;
