const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')
const sectionCtrl = require('../controllers/user/sectionController');


router.get('/', sectionCtrl.page.section);
router.get('/logined', sectionCtrl.page.logined);
router.get('/loginedTest', sectionCtrl.page.loginedTest);
router.post('/user', authMiddleware, sectionCtrl.request.getSection);
router.post('/follow', sectionCtrl.request.follow)

module.exports = router;
