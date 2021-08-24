const express = require('express');
const router = express.Router();

const policyCtrl = require('../controllers/policy/policyController');

// 고객센터
router.get('/', policyCtrl.request.policyPage);
router.get('/privacy', policyCtrl.request.privacyPage);

module.exports = router;
