const express = require('express');
const todayCtrl = require('../controllers/today/todayController');
const ampmCtrl = require('../controllers/today/ampmController');
const router = express.Router();

// NOTE: 기사 상세 화면
router.get('/word', todayCtrl.request.getMainTodayWord);
router.get('/article', todayCtrl.request.getMainTodayArticle);
router.get('/ampm7', ampmCtrl.getTodayAMPMAtricle);

module.exports = router;
