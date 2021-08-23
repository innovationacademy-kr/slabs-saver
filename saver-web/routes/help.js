const express = require('express');
const router = express.Router();

const helpCtrl = require('../controllers/help/helpController');

// 고객센터
router.get('/', helpCtrl.request.supportURL);

module.exports = router;
