const express = require('express');
const router = express.Router();

const aboutusCtrl = require('../controllers/help/aboutusController');

// 고객센터
router.get('/', aboutusCtrl.request.supportURL);

module.exports = router;
