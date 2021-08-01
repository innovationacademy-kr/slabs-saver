const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth')
const sectionCtrl = require('../controllers/user/sectionController');


router.get('/', sectionCtrl.page.section);
router.post('/user', authMiddleware, sectionCtrl.request.getSection);

module.exports = router;
