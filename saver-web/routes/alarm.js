const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const alarmCtrl = require('../controllers/alarm/alarmController');

// 북마크

router.get('/article', authMiddleware, alarmCtrl.request.getAlarm);
router.get('/:id', authMiddleware, alarmCtrl.request.checkAlarm);
router.post('/del/:id', authMiddleware, alarmCtrl.request.delAlarm)
// 북마크페이지 연결
router.get('/', alarmCtrl.section);

module.exports = router;
