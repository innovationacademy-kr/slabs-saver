const alert = require('alert');
const getCurrentUser = require('../lib/getCurrentUser');
const isEmptyObject = require('../lib/isEmptyObject');
const sendMail = require('../lib/sendMail');
const CATEGORY = require('../lib/constants/category');
const converter = require('../lib/converter');
const { Author, Article, Invitation } = require('../models');

module.exports = {
  index: async (req, res, next) => {
    const currentUser = await getCurrentUser(req.user?.id);
    if (!currentUser) res.redirect('/author/login');
    // TODO: 최근의 기사를 가져올 수 있게 sort 기능을 추가하자
    const category =
      isEmptyObject(req.query) || req.query.category === '0' ? CATEGORY.ALL : +req.query.category;
    const articles = await Article.findAll({
      where: { category },
      include: {
        model: Author,
        attributes: ['id', 'name', 'desk', 'code'],
      },
    });
    currentUser.code = String(currentUser.code)[0];
    res.render('author/index', { articles, currentUser });
  },

  loginPage: (req, res, next) => {
    res.render('author/login', { title: 'login!!!' });
  },

  deskProcess: async (req, res, next) => {
    const articles = JSON.parse(JSON.stringify(req.body));
    // TODO: 로딩 페이지 띄우기
    await Promise.all(
      Object.entries(articles).map(async (article) => {
        await Article.update(
          {
            confirmed: +article[1][0],
            am7: +article[1][1],
            pm7: +article[1][2],
          },
          {
            where: { id: +article[0] },
          },
        );
      }),
    );
    res.redirect('/author');
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
    const { email, name, code } = req.query;
    const user = {
      email,
      name,
      code
    };
    res.render('author/signup', { title: 'author page', user });
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
      await Invitation.update( { state: 2 }, { where: { email }, individualHooks: true } );
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
        article.category = req.body.category;
        if (req.file && req.file.filename) {
          article.image = req.file.filename;
        }
        article.imageDesc = req.body.imageDesc;
        article.imageFrom = req.body.imageFrom;
        article.briefing = req.body.briefing;
        if (additionalParagraph) {
          article.additionalParagraph = additionalParagraph;
        }
        article.state = req.body.saveBtn !== '';
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

  // admin //

  preSignup: (req, res, next) => {
    res.render('author/preSignup', { title: '임시 회원가입 페이지' });
  },

  preSignupRequest: async (req, res, next) => {
    const { email, name } = req.body;
    try {
      await Invitation.create({ email, name });
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((e) => {
          alert(e.message);
        });
      } else {
        alert('알 수 없는 에러 발생');
      }
      return res.redirect('/author/pre-signup');
    }
    alert("성공적으로 저장되었습니다.");
    return res.redirect('/author/login');
  },

  admin: async (req, res, next) => {
    res.render('admin/index');
  },

  invite: async (req, res, next) => {
    const userList = await Invitation.findAll({});
    const standByUsers = userList.map((user) => {
      return {
        ...user.dataValues,
        intState: +user.state,
        state: converter.inviteState(user.state)
      };
    });
    res.render('admin/invitation', { standByUsers });
  },

  inviteRequest: async (req, res, next) => {
    const { approved, declined, email, name, code } = req.body;
    if (approved == '' &&  code != '0') {
      await Invitation.update(
        {
          state: 1
        },
        {
          where: { email }
        });
        sendMail(email, name, code);
    } else if (declined == '') {
      await Invitation.update(
        {
          state: 2
        },
        {
          where: { email }
        });
    }
    res.redirect('/author/_admin/invitation');
  },

  authorizedSignup: (req, res, next) => {
    res.render('author/authorizedSignup', {title: '인증된 회원가입 페이지'});
  }
};
