const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const settingCtrl = require('../controllers/user/settingController');

// 알림페이지 연결
router.get('/', settingCtrl.section);
router.get('/getuser', authMiddleware, settingCtrl.request.getUser);
router.post('/alarmOnOff/:flag', authMiddleware, settingCtrl.request.OnOff);


module.exports = router;
