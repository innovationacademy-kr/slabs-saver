const express = require('express');
const { Author, Articles } = require('../models');
const router = express.Router();

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
  Author.create({name:'sanam', password:'1234', email:'1234@asdf', contact:'1234'})
    .then(((author) => {
      res.render('author/signup', { title: author.name });
    }))
    .catch((err) => {
      res.render('author/signup', { title: 'error!!' });
    })
});

router.get('/all', (req, res, next) => {
  Author.findAll({})
    .then((authors) => {
      authors.forEach((author) => {
        console.log(`${author.name} ${author.password} ${author.email}`);
      })
      res.render('author/signup', { title: author.name });
    })
    .catch((err) => {
      res.render('author/signup', { title: 'error!!' });
    })
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

router.post('/articles/new', (req, res, next) => {
  Articles.create({headline: req.body.headline, author: 'author', category: req.body.categories})
  .then((article) => {
    res.send(article);
  })
  .catch((err) => {
    res.send(err);
  });
});

// NOTE: 기사 작성 페이지(수정)
router.get('/articles/edit', (req, res, next) => {
  res.send(req.body);
});

// NOTE: 내 기사목록 페이지
router.get('/articles', (req, res, next) => {
  Articles.findAll({})
  .then((myArticles) => {
    myArticles.forEach((article) => [...article])})
  .then((articles) => res.render('author/articles', { title: '내 기사목록 페이지', articles: articles }))
  .catch((err) => console.log(err));
//   let articles = [{
//     id: 1,
//     headline: 'asd',
// category: 'politic',
// author: 'author',
// publishTime: null,
// isApproved: null,
// am7: null,
// pm7: null,
// approve: null,
// createdAt: "2021-05-11T09:54:07.000Z",
// updatedAt: "2021-05-11T09:54:07.000Z"
// },{id: 2,
//   headline: 'asd',
// category: 'politic',
// author: 'author',
// publishTime: null,
// isApproved: null,
// am7: null,
// pm7: null,
// approve: null,
// createdAt: "2021-05-11T09:54:07.000Z",
// updatedAt: "2021-05-11T09:54:07.000Z"
// }];
//   res.render('author/articles', { title: '내 기사목록 페이지', articles: articles });
});

// NOTE: 기사 확인 페이지
router.get('/articles/new/temp', (req, res, next) => {
  res.render('author/checkArticle', { title: '기사 확인 페이지!!!' });
});

module.exports = router;
