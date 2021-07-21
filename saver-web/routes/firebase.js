const express = require('express');
const router = express.Router();
const FirebaseCtrl = require('../controllers/firebase/firebaseController');

router.post('/', FirebaseCtrl);

module.exports = router;
