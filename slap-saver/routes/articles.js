const express = require('express');
const articleCtrl = require('../controllers/articleController');
const router = express.Router();

// NOTE: 기사 상세 화면
router.get('/:articleName', articleCtrl.viewDetail);

module.exports = router;
