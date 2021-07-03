const express = require('express');
const todayCtrl = require('../controllers/today/todayController');
const router = express.Router();

const { s3ImageUpload } = require('../lib/aws/s3Uploader');

// NOTE: 기사 상세 화면
router.get('/', todayCtrl.request.getMainToday);

module.exports = router;
