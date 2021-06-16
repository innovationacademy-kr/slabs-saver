const alert = require('alert');
const { Author, Article, Invitation } = require('../models');

const { pick } = require('../lib/util');

const getCurrentUser = require('../lib/getCurrentUser');
const isEmptyObject = require('../lib/isEmptyObject');
const STATUS = require('../lib/constants/articleStatus');
const sendMail = require('../lib/sendMail');
const converter = require('../lib/converter');
const { parseParagraps } = require('../lib/parse')

const INVITATION = require('../lib/constants/invitationState');
const CATEGORY = require('../lib/constants/category');
const POSITION = require('../lib/constants/position');
const ARTICLE = require('../lib/constants/articleStatus');

const deskProcessRequest = async (req, res, next) => {
  // TODO: 로딩 페이지 띄우기
  // TODO: 데스크인 경우와 편집장인 경우 나누기
  // TODO: 데스크가 출고를 off 하고 am7, pm7을 ON 하고 보내면 beforeUpdate 훅에서 에러 발생하게 만들자
  const articles = req.body.articles;
  const currentUser = await getCurrentUser(req.user.id);
  const getRequests = (arr) => arr.map((article) => {
    const request = new Promise((resolve, reject) => {
      try {
        Article.update({
          status: article.status,
          am7: article.am7 ? 1 : 0,
          pm7: article.pm7 ? 1 : 0.
        }, {
          where: { id: article.id }
        }).then(res => {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
    return request;
  });

  if (currentUser.position === POSITION.DESK) {
    const requests = getRequests(articles);
    await Promise.all(requests)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (currentUser.position > POSITION.DESK) {
    // TODO: 게재 일자도 기사 모델의 칼럼에 추가하자
    // TODO: 편집장이 출고가 안된걸 게재하려고 하면 beforeUpdate 훅에서 에러 발생하게 하자
    // TODO: beforeUpdate 에서 게재가 되었다면 am7, pm7은 off하자
    const requests = getRequests(articles);
    await Promise.all(requests)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  res.status(200).json({ result: '수정 완료' });
};

const logoutRequest = async (req, res, next) => {
  if (req.user) {
    req.logout();
    req.session.save(() => {
      return res.redirect('/author');
    });
  } else {
    res.redirect('/author');
  }
};

const signupRequest = async (req, res, next) => {
  const { email, password, confirm, name, code, contact, position, category } = req.body;
  const photo = req.file ? req.file.filename : null;
  if (password !== confirm) {
    res.json({
      result: false,
      message: '재입력한 비밀번호가 일치하지 않습니다.',
    })
    .status(400);
  }
  // TODO: Author Service 객체 만들어서 추상화하기
  try {
    await Author.create({ email, password, name, code, position, contact, photo, category });
    await Invitation.update({ state: INVITATION.COMPLET }, { where: { email } });
    res.json({
      result: true,
      message: '',
    })
    .status(200);
  } catch (error) {
    res.json({
      result: false,
      message: `오류가 발생하였습니다 (${error.message})`,
    })
    .status(400);
  }
};

// TODO: ajax로 변경
const newArticleRequest = async (req, res, next) => {
  const paragraphs = parseParagraps(req.body);
  const {
    body,
    user: { id },
    file
  } = req;
  const { headline, category, imageDesc, imageFrom, briefing } = body;
  try {
    const author = await Author.findOne({ where: { id } });
    await author.createArticle({
      headline,
      category,
      imageDesc,
      imageFrom,
      briefing,
      image: file ? file.filename : null,
      status: body.saveBtn === '' ? STATUS.DRAFTS : STATUS.COMPLETED,
      paragraphs: JSON.stringify(paragraphs),
    });
  } catch (error) {
    alert(error.errors ? error.errors[0].message : '생성실패');
  }
  return res.redirect('/author/articles');
};

const editArticle = async (req, res, next) => {
  // res.json({
  //   result: false,
  //   message: `오류가 발생하였습니다 (${e.message})`
  // })
  return res.redirect('/author/articles');

};

// TODO: ajax로 변경
const editArticleRequest = async (req, res, next) => {
  const paragraphs = parseParagraps(req.body);
  const {
    file,
    body,
    params: { articleId },
  } = req;
  const { headline, category, imageDesc, imageFrom, briefing } = body;
  try {
    await Article.update(
      {
        headline,
        category,
        imageDesc,
        imageFrom,
        briefing,
        image: file && file.filename ? file.filename : '',
        paragraphs: JSON.stringify(paragraphs),
        status: body.saveBtn === '' ? STATUS.DRAFTS : STATUS.COMPLETED,
      },
      {
        where: { id: articleId },
        individualHooks: true,
      },
    );
  } catch (error) {
    alert(error.errors ? error.errors[0].message : '생성실패');
  }
  return res.redirect('/author/articles');
};
// admin //

const preSignup = async (req, res, next) => {
  res.render('author/preSignup', { title: 'signup request', admin: false });
};

const preSignupRequest = async (req, res, next) => {
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
  alert('성공적으로 저장되었습니다.');
  return res.redirect('/author/login');
};

const admin = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  if (!currentUser) res.redirect('/author/login');
  res.render('admin/index', { title: 'admin home', currentUser, admin: true });
};

const invite = async (req, res, next) => {
  const userList = await Invitation.findAll({});
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  if (!currentUser) res.redirect('/author/login');
  const standByUsers = userList.map((user) => {
    return {
      ...user.dataValues,
      intState: +user.state,
      state: converter.inviteState(user.state),
    };
  });
  res.render('admin/invitation', { title: 'invite', currentUser, standByUsers, admin: true });
};

// NOTE: state
// state: 0 -> 가입 대기
// state: 1 -> 가입 승인
// state: 2 -> 가입 완료
// state: 3 -> 가입 거절
const decisionRequest = async (req, res, next) => {
  const { approved, declined, email, code } = req.body;
  if (approved === '' && code !== '0') {
    // 이메일 발송
    const candidate = await Invitation.findOne({ where: { email } });
    const invitationId = candidate.id;
    candidate.state = INVITATION.APPROVAL;
    candidate.code = code;
    sendMail(invitationId, email, code);
    await candidate.save();
    // res.json({
    //   result: true,
    //   message: ''
    // }).status(200);
  } else if (declined === '') {
    // 가입거절
    await Invitation.update({ state: INVITATION.REFUSED }, { where: { email } });
    // res.json({
    //   result: true,
    //   message: '가입이 거절되었습니다.'
    // }).status(200);
  } else if (code === '0') {
    // alert('역할을 설정해 주십시오!');
    // res.json({
    //   result: false,
    //   message: '역할을 설정해 주세요.'
    // }).status(400);
  }
  //
  res.redirect('/author/_admin/invitation');
};

const inviteRequest = async (req, res, next) => {
  console.log('----------------------------')
  const {email, name, category, position} = req.body;
  if (email === '' || name === '' || category === 0|| position === 0) {
    res.status(400).json({
      message: '빈 항목이 있습니다.'
    });
  } else {
    try {
      await Invitation.create({ email, name, category, position, state: INVITATION.APPROVAL });
      const candidate = await Invitation.findOne({ where: { email } });
      const invitationId = candidate.id;
      sendMail(invitationId, email);
      res.json({
        message: '이메일이 발송되었습니다.'
      }).status(200);
    } catch (error) {
      res.status(400).json({
        message: '이메일이 중복되었습니다.'
      });

    }
  }
};

const invitePage = async (req, res, next) => {
  // TODO 페이징 필요
  const userList = await Invitation.findAll({});
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  if (!currentUser) res.redirect('/author/login');
  const standByUsers = userList.map((user) => {
    return {
      ...user.dataValues,
      intState: +user.state,
      state: converter.inviteState(user.state),
    };
  });
  res.render('admin/invitation', { title: 'invite', currentUser, standByUsers, admin: true });
};


const preSignupPage = async (req, res, next) => {
  res.render('author/preSignup', { title: 'signup request', admin: false });
};

const loginPage = async (req, res, next) => {
  res.render('author/login', { title: 'login' });
};

const signupPage = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.redirect('/author/pre-signup');
  }
  const candidate = await Invitation.findOne({ where: { id } });
  if (candidate === null || candidate.state !== 1) {
    alert('회원가입의 대상이 아닙니다!');
    return res.redirect('/author/pre-signup');
  }
  const { email, name, code, position, category } = candidate;
  const user = { email, name, code, position, category };
  const POSITION = {
    1: '기자',
    2: '데스크',
    3: '편집장',
    4: '관리자'
  };
  res.render('author/signup', { title: 'signup', layout: 'layout/adminLayout', user, userJson: JSON.stringify(user), POSITION });
};

const editMeetingPage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  res.render('author/editMeeting', { title: 'edit-meeting', currentUser, admin: false });
};

const newArticlePage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  if (!currentUser) return res.redirect('/author/login');
  let defaultCategory = String(currentUser.code)[0];
  if (defaultCategory === '1') {
    defaultCategory = '2';
  }
  res.render('author/newArticle', {
    title: 'new article',
    defaultCategory,
    currentUser,
    admin: false,
  });
};

const editArticlePage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  try {
    const article = await Article.findOne({ where: { id: req.params.articleId } });
    article.image = `/images/articleImages/${article.image}`;
    const paragraphs = JSON.parse(article.paragraphs).paragraphs;
    return res.render('author/editArticle', {
      article,
      paragraphs,
      currentUser,
      admin: false,
      title: 'edit article',
    });
  } catch (error) {
    console.error(error);
  }
};

const myArticlePage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  const author = await Author.findOne({ where: { id: req.user.id } });
  const articles = await author.getArticles();
  return res.render('author/articles', {
    title: 'my articles',
    articles,
    admin: false,
    currentUser,
  });
};

const previewPage = async (req, res, next) => {
  const article = await Article.findOne({
    where: { id: req.params.articleId },
    include: { model: Author, attributes: ['name', 'photo'] },
  });
  article.authorImg = `/images/authorImages/${article.Author.photo}`;
  article.image = `/images/articleImages/${article.image}`;
  article.paragraphs = JSON.parse(article.paragraphs);
  res.render('articles/article', { title: 'preview', article, admin: false });
};

const indexPage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  if (!currentUser) res.redirect('/author/login');
  const category = isEmptyObject(req.query) || req.query.category === '0' ? CATEGORY.ALL : +req.query.category;

  // 접속한 사람에 따라 보여지는 기사들이 달라짐
  const articles = await Article.findAll({
    where: { category },
    include: { model: Author, attributes: ['id', 'name', 'code'] },
  });
  const { position, code } = currentUser;
  // 기사, 데스크, 편집장인 경우 보여지는 부분이 있음
  if ([POSITION.REPOTER, POSITION.DESK, POSITION.CHIEF_EDITOR].includes(currentUser.position)) {
    let ejsfile = '';
    let variable;
    const articlesData = JSON.stringify(articles.map((item) => pick(item, ['id', 'pm7', 'am7', 'status'])));
    if (position === POSITION.REPOTER) {
      ejsfile = 'author/desking/index';
    } else if (position === POSITION.DESK) {
      currentUser.code = code; // 기사의 코드 === 기사의 카테고리 === 수정가능한 권한을 가짐
      currentUser.category = converter.category(code);
      ejsfile = 'author/desking/desk';
    } else if (position === POSITION.CHIEF_EDITOR) {
      ejsfile = 'author/desking/chiefEditor';
    }
    variable = { title: 'home', articles, currentUser, admin: false, articlesData };
    res.render(ejsfile, variable);
  } else if (position === POSITION.ADMIN) {
    res.redirect('/author/_admin');
  }
};

const adminPage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user ? req.user.id : null);
  if (!currentUser) res.redirect('/author/login');
  res.render('admin/index', { title: 'admin home', currentUser, admin: true });
};


module.exports = {
  request: {
    deskProcess: deskProcessRequest,
    logout: logoutRequest,
    signup: signupRequest,
    newArticle: newArticleRequest,
    editArticle: editArticleRequest,
    preSignup: preSignupRequest,
    invite: inviteRequest,
    decision: decisionRequest,
  },
  page: {
    index: indexPage,
    preSignup: preSignupPage,
    admin: adminPage,
    invite: invitePage,
    login: loginPage,
    signup: signupPage,
    editMeeting: editMeetingPage,
    newArticle: newArticlePage,
    editArticle: editArticlePage,
    myArticle: myArticlePage,
    preview: previewPage
  },
};
