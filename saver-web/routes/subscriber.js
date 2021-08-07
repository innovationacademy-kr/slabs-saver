const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')
const subscriberCtrl = require('../controllers/subscriber/subscriberController');

// 로그인, 회원가입
router.get('/signup', subscriberCtrl.page.signup);
router.get('/login', subscriberCtrl.page.login);
router.post('/signup', subscriberCtrl.request.signup);
router.post('/login', subscriberCtrl.request.login);

router.post('/getAlarmStatus', authMiddleware, subscriberCtrl.request.AlarmStatus);
router.post('/updateAlarmStatus', authMiddleware, subscriberCtrl.request.upAlarmStatus);
module.exports = router;
