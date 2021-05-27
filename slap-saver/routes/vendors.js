const express = require('express');
const router = express.Router();
const path = require('path'); 

console.log(path.join(__dirname,"../node_modules/bootstrap/dist"))

router.use('/bootstrap', express.static(path.join(__dirname,"../node_modules/bootstrap/dist")));
router.use('/jquery', express.static(path.join(__dirname,"../node_modules/jquery/dist")));


module.exports = router;