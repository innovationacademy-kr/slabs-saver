const express = require('express');
const multer = require('multer');


const articleCtrl = require('../controllers/articleController');
const router = express.Router();
const { loggedIn } = require('../middlewares/loggedIn');

const { s3ImageUpload } = require('../lib/aws/s3Uploader');

// NOTE: 기사 상세 화면
router.get('/detail/:articleId', articleCtrl.page.detail);
router.post('/upload/image', s3ImageUpload({ folder: 'article' }).single('image'), articleCtrl.request.uploadImage)

module.exports = router;
