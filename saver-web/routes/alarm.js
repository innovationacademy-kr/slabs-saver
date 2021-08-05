const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const alarmCtrl = require('../controllers/alarm/alarmController');

// 알림
router.post('/alarm-process', alarmCtrl.request.newAlarm);
router.get('/article', authMiddleware, alarmCtrl.request.getAlarm);
router.get('/:id', authMiddleware, alarmCtrl.request.checkAlarm);
router.post('/del/:id', authMiddleware, alarmCtrl.request.delAlarm);

// 알림페이지 연결
router.get('/', alarmCtrl.section);

module.exports = router;
