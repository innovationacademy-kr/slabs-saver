const express = require('express');
const bookmarkCtrl = require('../controllers/user/bookmarkController');
const router = express.Router();

	router.get('/', bookmarkCtrl.section);

module.exports = router;