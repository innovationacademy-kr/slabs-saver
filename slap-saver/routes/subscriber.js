const express = require('express');
const router = express.Router();
const subscriberCtrl = require('../controllers/subscriberController')

router.get('/signup', subscriberCtrl.page.signup);
router.get('/login', subscriberCtrl.page.login);
router.post('/signup', subscriberCtrl.request.signup);
router.post('/login', subscriberCtrl.request.login);

module.exports = router;