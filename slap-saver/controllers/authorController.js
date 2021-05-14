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
    const { email, password, confirm, name, code, contact } = req.body;
    const photo = req.file ? req.file.filename : null;
    if (password !== confirm) {
      alert('비밀번호가 같지 않습니다.');
      return res.redirect('/author/signup');
    }
    // TODO: Author Service 객체 만들어서 추상화하기
    try {
      await Author.create({ email, password, name, code, contact, photo });
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

  editMeetingPage: (req, res, next) => {
    res.render('author/editMeeting', { title: '편집회의 페이지!' });
  },

  newArticlePage: (req, res, next) => {
    res.render('author/newArticle', { title: '기사 작성 페이지!!' });
  },

  newArticle: async (req, res, next) => {
    const {
      body: { headline, category, imageDesc, imageFrom, briefing, additionalParagraph },
      user: { id },
    } = req;
    // const image = req.file ? req.file.filename : null;
    const paragraphs = Array.isArray(additionalParagraph)
      ? additionalParagraph.join('|-|')
      : additionalParagraph;
    try {
      const author = await Author.findOne({ where: { id } });
      await author.createArticle({
        headline,
        category,
        imageDesc,
        imageFrom,
        briefing,
        author: author.name,
        image: req.file ? req.file.filename : null,
        additionalParagraph: paragraphs,
        state: req.body.saveBtn === '' ? false : true,
      });
      alert('저장에 성공하였습니다.');
    } catch (error) {
      alert(error.errors ? error.errors[0].message : '생성실패');
    }
    return res.redirect('/author/articles');
  },

  editArticlePage: (req, res, next) => {
    Article.findOne({ where: { id: req.params.articleId } })
      .then((article) => {
        let paragraph = [];
        if (article.additionalParagraph) {
          paragraph = article.additionalParagraph.split('|-|');
        }
        article.image = `/images/articleImages/${article.image}`;
        return res.render('author/editArticle', {
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
        if (req.file && req.file.filename) {
          article.image = req.file.filename;
        }
        article.imageDesc = req.body.description;
        article.imageFrom = req.body.source;
        article.briefing = req.body.briefing;
        if (additionalParagraph) {
          article.additionalParagraph = additionalParagraph;
        }
        article.state = req.body.saveBtn === '' ? false : true,
        article.save();
      })
      .then(() => res.redirect('/author/articles'))
      .catch((err) => console.log(err));
  },

  myArticlePage: async (req, res, next) => {
    const author = await Author.findOne({ where: { id: req.user.id } });
    const articles = await author.getArticles();
    return res.render('author/articles', {
      title: '내 기사목록 페이지',
      articles,
    });
  },

  previewPage: (req, res, next) => {
    Article.findOne({ where: { id: req.params.articleId } })
      .then((article) => {
        let paragraph = [];
        if (article.additionalParagraph && article.additionalParagraph.length > 1) {
          paragraph = article.additionalParagraph.split('|-|');
        }
        article.image = `/images/articleImages/${article.image}`;
        res.render('author/checkArticle', {
          title: '기사 확인 페이지!!!',
          article,
          paragraph,
        });
      })
      .catch((err) => console.log(err));
  },
};
