var express = require('express');
var router = express.Router();

/* GET home page. */

// NOTE: 기사 메인 화면
router.get('/:articleName', function(req, res, next) {
  // NOTE: DB에서 articleId를 이용해서 기사를 빼온다
  res.render('articles/article', { title: req.params.articleId });
});

module.exports = router;
