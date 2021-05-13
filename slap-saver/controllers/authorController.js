const alert = require('alert');
const { Author, Article } = require('../models');

module.exports = {
  index: (req, res, next) => {
    res.render('author/index', { title: 'authors!!!' });
  },
  loginPage: (req, res, next) => {
    res.render('author/login', { title: 'login!!!' });
  },

  logout: (req, res, next) => {
    if (req.user) {
      req.logout();
      req.session.save(() => {
        console.log('---------------------------------------');
        console.log('로그아웃 성공 로그인페이지로 이동합니다.');
        console.log('---------------------------------------');
        return res.redirect('/author');
      });
    } else {
      console.log('---------------------------------------');
      console.log('-------- 로그인을 먼저 해주세요!! -----------');
      console.log('---------------------------------------');
      res.redirect('/author');
    }
  },

  signupPage: (req, res, next) => {
    res.render('author/signup', { title: 'author page' });
  },

  signup: async (req, res, next) => {
    const { email, password, confirm, contact } = req.body;
    const photo = req.file ? req.file.filename : null;
    if (password !== confirm) {
      alert('비밀번호가 같지 않습니다.');
      return res.redirect('/author/signup');
    }
    // TODO: Author Service 객체 만들어서 추상화하기
    try {
      await Author.create({ email, password, contact, photo });
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((e) => {
          alert(e.message);
        });
      } else {
        alert('알 수 없는 에러 발생');
      }
      return res.redirect('/author/signup');
    }
    return res.redirect('/author/login');
  },
  
  getEditMeeting: (req, res, next) => {
    res.render('author/editMeeting', { title: '편집회의 페이지!' });
  },

  getNewArticle: (req, res, next) => {
    res.render('author/newArticle', { title: '기사 작성 페이지!!' });
  },

  newArticle: (req, res, next) => {
    let additionalParagraph = '';
    if (Array.isArray(req.body.additionalParagraph)) {
      additionalParagraph = req.body.additionalParagraph.join('|-|');
    } else {
      additionalParagraph = req.body.additionalParagraph;
    }
    Article.create({
      headline: req.body.headline,
      author: 'author',
      category: req.body.categories,
      image: req.file.filename,
      imageDesc: req.body.description,
      imageFrom: req.body.source,
      briefing: req.body.briefing,
      additionalParagraph: additionalParagraph,
    })
      .then((article) => {
        res.send('저장에 성공하였습니다.');
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getEditArticle: (req, res, next) => {
    Article.findOne({ where: { id: req.params.articleId } })
      .then((article) => {
        let paragraph = [];
        if (article.additionalParagraph) {
          paragraph = article.additionalParagraph.split('|-|');
        }
        article.image = `/images/articleImages/${article.image}`;
        res.render('author/editArticle', {
          title: '기사 수정 페이지',
          article: article,
          paragraph: paragraph,
        });
      })
      .catch((err) => console.log(err));
  },

  editArticle: (req, res, next) => {
    let additionalParagraph = '';
    if (Array.isArray(req.body.additionalParagraph)) {
      additionalParagraph = req.body.additionalParagraph.filter((p) => p.length > 0);
      additionalParagraph = additionalParagraph.join('|-|');
    } else {
      additionalParagraph = req.body.additionalParagraph;
    }
    Article.findOne({ where: { id: req.params.articleId } })
      .then((article) => {
        article.headline = req.body.headline;
        article.category = req.body.categories;
        if (req.file?.filename) {
          article.image = req.file.filename;
        }
        article.imageDesc = req.body.description;
        article.imageFrom = req.body.source;
        article.briefing = req.body.briefing;
        if (additionalParagraph) {
          article.additionalParagraph = additionalParagraph;
        }
        article.save();
      })
      .then(() => res.send('수정이 완료되었습니다.'))
      .catch((err) => console.log(err));
  },

  getMyArticles: (req, res, next) => {
    Article.findAll()
      .then((myArticles) =>
        Array.from(myArticles).map((article) => {
          article.href = `/author/articles/edit/${article.id}`;
          return article;
        }),
      )
      .then((articles) => {
        res.render('author/articles', {
          title: '내 기사목록 페이지',
          articles: articles,
        });
      })
      .catch((err) => console.log(err));
  },

  checkArticle: (req, res, next) => {
    Article.findOne({ where: { id: req.params.articleId } })
      .then((article) => {
        let paragraph = [];
        if (article.additionalParagraph?.length > 1) {
          paragraph = article.additionalParagraph.split('|-|');
        }
        article.image = `/images/articleImages/${article.image}`;
        res.render('author/checkArticle', {
          title: '기사 확인 페이지!!!',
          article: article,
          paragraph: paragraph,
        });
      })
      .catch((err) => console.log(err));
  }
};
