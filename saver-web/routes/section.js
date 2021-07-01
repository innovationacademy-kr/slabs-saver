const express = require('express');
const sectionCtrl = require('../controllers/user/sectionController');
const router = express.Router();

	router.get('/', sectionCtrl.section);

module.exports = router;
