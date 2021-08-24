const express = require('express');
const router = express.Router();

const policyCtrl = require('../controllers/policy/policyController');

// 고객센터
router.get('/', policyCtrl.request.policyPage);

module.exports = router;
