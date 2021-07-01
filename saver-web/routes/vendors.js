const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
router.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
router.use('/axios', express.static(path.join(__dirname, '../node_modules/axios/dist')));
router.use('/editorjsNestedList', express.static(path.join(__dirname, '../node_modules/@editorjs/nested-list/dist')));
router.use('/editorjsImage', express.static(path.join(__dirname, '../node_modules/@editorjs/image/dist')));
router.use('/editorjsLink', express.static(path.join(__dirname, '../node_modules/@editorjs/link/dist')));
router.use('/editorjs', express.static(path.join(__dirname, '../node_modules/@editorjs/editorjs/dist')));

module.exports = router;
