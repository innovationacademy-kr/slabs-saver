const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const settingCtrl = require('../controllers/user/settingController');

// 알림페이지 연결
router.get('/', (req, res) => {
  res.render('user/setting', { title: 'slab-saver', layout: 'layout/userLayout' });
});
router.get('/login', settingCtrl.section);
router.post('/contact', settingCtrl.postContactMail);

router.get('/contact', (req, res) => {
  res.render('user/contact', { title: 'slab-saver', layout: 'layout/userLayout' });
});

router.get('/getuser', authMiddleware, settingCtrl.request.getUser);
router.post('/alarmOnOff/:flag', authMiddleware, settingCtrl.request.OnOff);

module.exports = router;
