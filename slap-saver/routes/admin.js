const express = require('express');

const router = express.Router();

const adminCtrl = require('../controllers/adminController');

/* GET home page. */
// NOTE: 기본 홈 화면
router.get('/', adminCtrl.home);

module.exports = router;
