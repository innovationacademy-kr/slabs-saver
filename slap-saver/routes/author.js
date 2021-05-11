const express = require('express');
const {Author} = require('../models');
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
    res.render('author/signup', { title: 'author page'});
});

router.post('/signup', (req, res, next) => {
  // NOTE: 아래의 작업은 추후 모델로 옮긴다.
  const {email, password, confirm, contact} = req.body;
  if ((!email || !password || !confirm || !contact)) {
    // return res.send('뭔가 비었음');
    res.redirect('/author/signup')
  }
  Author.findOne({ where: {email} })
    .then((author) => {
      if (author) {
        throw(new Error('already exists'));
      }
      // NOTE: 1. password check -> 영 + 숫자 6자리 ~ 15
      if (!/^[a-zA-Z0-9]{6,15}$/.test(password)){
        throw(new Error('password!!!!!!!!!!!!!!'));
      }
      // NOTE: 2. confirm
      if (password !== confirm) {
        throw(new Error('not same password'));
      }
      // NOTE: 3. 연락처
      if (!/^\d{3}-\d{3,4}-\d{4}$/.test(contact)) {
        throw(new Error('전화번호 형식 틀림'));
      }
      
      // NOTE: 4. create 한다.
      Author.create({email, password, contact})
        .then((author) => {
          res.redirect('/login');
        })
        .catch((err) => {
          console.log('-----------------')
          res.send(err.message)
          console.log('-----------------')
        })
    })
    .catch((err) => {
      console.log('-----------------')
      console.log(err.message)
      console.log('-----------------')
      res.send(err.message);
    })
});

// router.get('/signup', (req, res, next) => {
//   Author.create({name:'sanam', password:'1234', email:'1234@asdf', contact:'1234'})
//     .then(((author) => {
//       res.send('zzz');
//       res.render('author/signup', { title: author.name });
//     }))
//     .catch((err) => {
//       res.send('failed');
//       res.render('author/signup', { title: 'error!!' });
//     })
// });

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
  res.send(req.body);
});

// NOTE: 기사 작성 페이지(수정)
router.get('/articles/edit', (req, res, next) => {
  res.send(req.body);
});

// NOTE: 내 기사목록 페이지
router.get('/articles', (req, res, next) => {
  res.render('author/articles', { title: '내 기사목록 페이지' });
});

// NOTE: 기사 확인 페이지
router.get('/articles/new/temp', (req, res, next) => {
  res.render('author/checkArticle', { title: '기사 확인 페이지!!!' });
});

module.exports = router;
