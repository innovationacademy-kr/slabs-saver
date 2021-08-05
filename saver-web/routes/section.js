const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')
const sectionCtrl = require('../controllers/user/sectionController');

//section: page
router.get('/', sectionCtrl.page.section);
router.get('/logined', sectionCtrl.page.logined);
//section: request
router.post('/init', sectionCtrl.request.init);
router.post('/user', authMiddleware, sectionCtrl.request.getSection);
router.post('/follow', sectionCtrl.request.follow);
router.post('/unfollow', sectionCtrl.request.unfollow);

module.exports = router;
