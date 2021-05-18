const alert = require('alert');
const getCurrentUser = require('../lib/getCurrentUser');
const isEmptyObject = require('../lib/isEmptyObject');
const sendMail = require('../lib/sendMail');
const CATEGORY = require('../lib/constants/category');
const converter = require('../lib/converter');
const { Author, Article, Invitation } = require('../models');
const STATUS = require('../lib/constants/articleStatus');

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
        attributes: ['id', 'name', 'code'],
      },
    });
    currentUser.code = String(currentUser.code)[0];
    if (currentUser.position === 1) {
      res.render('author/desking/index', { articles, currentUser });
    } else if (currentUser.position === 2) {
      res.render('author/desking/desk', { articles, currentUser });
    } else if (currentUser.position === 3) {
      res.render('author/desking/chiefEditor', { articles, currentUser });
    } else if (currentUser.position === 4) {
      res.redirect('/author/_admin');
    } 
  },

  loginPage: (req, res, next) => {
    res.render('author/login', { title: 'login!!!' });
  },

  deskProcess: async (req, res, next) => {
    const articles = JSON.parse(JSON.stringify(req.body));
    // TODO: 로딩 페이지 띄우기
    // TODO: 데스크인 경우와 편집장인 경우 나누기
    // TODO: 데스크가 출고를 off 하고 am7, pm7을 ON 하고 보내면 beforeUpdate 훅에서 에러 발생하게 만들자
    const currentUser = await getCurrentUser(req.user.id);
    if (currentUser.position === 2) {
      await Promise.all(
        Object.entries(articles).map(async (article) => {
          // TODO: 이미 데이터가 4면 바꾸지 말아야함.
          // TODO: 이미 4라는건 편집장이 바꿨다는 거임.
          // TODO: 이건 beforeUpdate 에서 하면 될거같은데?
          // TODO: 아니다. 그냥 지금처럼 말고 findOne으로 기사를 찾은다음에 수정하고 save 하는 방식으로 변경하자
          const updateContent = !Array.isArray(article[1]) ?
            { status: +article[1] === 1 ? 3 : 2 } : 
            {
              status: +article[1][0] === 1 ? 3 : 2,
              am7: +article[1][1],
              pm7: +article[1][2], 
            }
          await Article.update( updateContent, { where: { id: +article[0] }, individualHooks: true });
        }),
      );
    } else if (currentUser.position > 2) {
      // TODO: 게재 일자도 기사 모델의 칼럼에 추가하자
      // TODO: 편집장이 출고가 안된걸 게재하려고 하면 beforeUpdate 훅에서 에러 발생하게 하자
      // TODO: beforeUpdate 에서 게재가 되었다면 am7, pm7은 off하자
      await Promise.all(
        Object.entries(articles).map(async (article) => {
          if (!Array.isArray(article[1])) {
            await Article.update({ status: +article[1] === 1 ? 3 : 2 }, { where: { id: +article[0] } });
          } else {
            if (article[1].length === 3) {
              const updateContent = {
                status: +article[1][0] === 1 ? 4 : 3,
                am7: +article[1][2],
                pm7: +article[1][3], 
              }
              await Article.update( updateContent, { where: { id: +article[0] }, individualHooks: true  });
            } else {
              let status;
              if (+article[1][1] === 1) {
                status = 4;
              } else {
                status = +article[1][0] === 1 ? 3 : 2;
              }
              const updateContent = {
                status,
                am7: +article[1][2],
                pm7: +article[1][3], 
              }
              await Article.update( updateContent, { where: { id: +article[0] } , individualHooks: true });
            }
          }
        }),
      );
    }
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
        status: req.body.saveBtn === '' ? STATUS.DRAFTS : STATUS.COMPLETED,
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
        article.status = req.body.saveBtn === '' ? STATUS.DRAFTS : STATUS.COMPLETED;
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
