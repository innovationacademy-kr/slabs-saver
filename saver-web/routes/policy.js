const express = require('express');
const router = express.Router();

const policyCtrl = require('../controllers/policy/policyController');

// 고객센터
router.get('/', policyCtrl.request.policyPage);
router.get('/privacy', policyCtrl.request.privacyPage);
router.get('/youthpolicy', policyCtrl.request.youthPolicyPage);
router.get('/copyrightpolicy', policyCtrl.request.copyRightPolicyPage);
router.get('/rejectemailpolicy', policyCtrl.request.rejectEmailPolicyPage);

module.exports = router;
