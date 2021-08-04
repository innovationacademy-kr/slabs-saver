const express = require('express');
const router = express.Router();

const {
  postFirebaseMessage,
  pushPage,
  postFirebaseArticle,
} = require('../controllers/firebase/firebaseController');

router.get('/', pushPage);
router.post('/', postFirebaseMessage);
router.post('/:articleId', postFirebaseArticle);

module.exports = router;
