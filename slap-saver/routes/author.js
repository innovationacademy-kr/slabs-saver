const express = require('express');
const { Author, Articles } = require('../models');
const router = express.Router();
const multer = require('multer');

const articleUploader = multer({ dest: 'public/images/articleImages' });

/* GET users listing. */
// NOTE: base: ~~/authors
router.get('/', (req, res, next) => {
  res.render('author/index', { title: 'authors!!!' });
});

// NOTE: 로그인 페이지
router.get('/login', (req, res, next) => {
  // NOTE: render: 무언가를 그려준다. context -> 상태
  res.render('author/login', { title: 'login!!!' });
});

// NOTE: 로그인 요청
router.post('/login', (req, res, next) => {
  // NOTE: 그냥 데이터를 클라이언트한테 보낸다. 그러면 브라우저가 자기가 알아서 클라이언트한테 보여준다. ft_write
  res.send(req.body);
});

// NOTE: 회원가입 페이지
router.get('/signup', (req, res, next) => {
  Author.create({ name: 'sanam', password: '1234', email: '1234@asdf', contact: '1234' })
    .then((author) => {
      res.render('author/signup', { title: author.name });
    })
    .catch((err) => {
      res.render('author/signup', { title: 'error!!' });
    });
});

router.get('/all', (req, res, next) => {
  Author.findAll({})
    .then((authors) => {
      authors.forEach((author) => {
        console.log(`${author.name} ${author.password} ${author.email}`);
      });
      res.render('author/signup', { title: author.name });
    })
    .catch((err) => {
      res.render('author/signup', { title: 'error!!' });
    });
});

// NOTE: 회원가입 요청
router.post('/signup', (req, res, next) => {
  res.send(req.body);
});

// NOTE: 편집회의 페이지
router.get('/edit-meeting', (req, res, next) => {
  res.render('author/editMeeting', { title: '편집회의 페이지!' });
});

// NOTE: 기사 작성 페이지(새 기사)
router.get('/articles/new', (req, res, next) => {
  res.render('author/newArticle', { title: '기사 작성 페이지!!' });
});

router.post('/articles/new', articleUploader.single('picture'), (req, res, next) => {
  let tmpS = '';
  if (req.body.additionalParagraph?.length > 1) {
    tmpS = req.body.additionalParagraph.join('|-|');
  } else {
    tmpS = req.body.additionalParagraph;
  }
  Articles.create({
    headline: req.body.headline,
    author: 'author',
    category: req.body.categories,
    image: req.file.filename,
    imageDesc: req.body.description,
    imageFrom: req.body.source,
    briefing: req.body.briefing,
    additionalParagraph: tmpS,
  })
    .then((article) => {
      res.send('저장에 성공하였습니다.');
    })
    .catch((err) => {
      res.send(err);
    });
});

// NOTE: 기사 작성 페이지(수정)
router.get('/articles/edit/:articleId', (req, res, next) => {
  Articles.findOne({ where: { id: req.params.articleId } })
    .then((article) => {
      let p = [];
      if (article.additionalParagraph) {
        p = article.additionalParagraph.split('|-|');
      }
      article.image = `/images/articleImages/${article.image}`;
      res.render('author/editArticle', {
        title: '기사 수정 페이지',
        article: article,
        paragraph: p,
      });
    })
    .catch((err) => console.log(err));
});

router.post('/articles/edit/:articleId', articleUploader.single('picture'), (req, res, next) => {
  let tmpS = '';
  if (req.body.additionalParagraph?.length > 1) {
    tmpS = req.body.additionalParagraph.filter((p) => p.length > 0);
    tmpS = tmpS.join('|-|');
  } else {
    tmpS = req.body.additionalParagraph;
  }
  Articles.findOne({ where: { id: req.params.articleId } })
    .then((article) => {
      article.headline = req.body.headline;
      article.category = req.body.categories;
      if (req.file?.filename) {
        article.image = req.file.filename;
      }
      article.imageDesc = req.body.description;
      article.imageFrom = req.body.source;
      article.briefing = req.body.briefing;
      if (tmpS) {
        article.additionalParagraph = tmpS;
      }
      article.save();
    })
    .then(() => res.send('수정이 완료되었습니다.'))
    .catch((err) => console.log(err));
});

// NOTE: 내 기사목록 페이지
router.get('/articles', (req, res, next) => {
  Articles.findAll()
    .then((myArticles) =>
      Array.from(myArticles).map((article) => {
        article.href = `articles/edit/${article.id}`;
        return article;
      }),
    )
    .then((articles) => {
      console.log(articles);
      res.render('author/articles', {
        title: '내 기사목록 페이지',
        articles: articles,
      });
    })
    .catch((err) => console.log(err));
});

// NOTE: 기사 확인 페이지
router.get('/articles/new/temp/:articleId', (req, res, next) => {
  Articles.findOne({ where: { id: req.params.articleId } })
    .then((article) => {
      let p = [];
      if (article.additionalParagraph?.length > 1) {
        p = article.additionalParagraph.split('|-|');
      }
      article.image = `/images/articleImages/${article.image}`;
      res.render('author/checkArticle', {
        title: '기사 확인 페이지!!!',
        article: article,
        paragraph: p,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
