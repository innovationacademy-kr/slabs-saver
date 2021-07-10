const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
router.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
router.use('/axios', express.static(path.join(__dirname, '../node_modules/axios/dist')));

router.use('/summernote', express.static(path.join(__dirname, '../node_modules/summernote/dist')));
module.exports = router;
