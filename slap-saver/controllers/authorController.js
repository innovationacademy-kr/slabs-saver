const alert = require('alert');
const getCurrentUser = require('../lib/getCurrentUser');
const isEmptyObject = require('../lib/isEmptyObject');
const sendMail = require('../lib/sendMail');
const converter = require('../lib/converter');
const { Author, Article, Invitation } = require('../models');
const STATUS = require('../lib/constants/articleStatus');
const { parseParagraps } = require('../lib/parse')

const INVITATION = require('../lib/constants/invitationState');
const CATEGORY = require('../lib/constants/category');
const POSITION = require('../lib/constants/position');
const ARTICLE = require('../lib/constants/articleStatus');

const index = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user?.id);
  if (!currentUser) res.redirect('/author/login');

  const category = isEmptyObject(req.query) || req.query.category === '0' ? CATEGORY.ALL : +req.query.category;
  const articles = await Article.findAll({
    where: { category },
    include: { model: Author, attributes: ['id', 'name', 'code'] },
  });
  if (currentUser.position === POSITION.REPOTER) {
    res.render('author/desking/index', { title: 'home', articles, currentUser, admin: false });
  } else if (currentUser.position === POSITION.DESK) {
    currentUser.code = String(currentUser.code)[0];
    currentUser.category = converter.category(+currentUser.code[0]);
    res.render('author/desking/desk', { title: 'home', articles, currentUser, admin: false });
  } else if (currentUser.position === POSITION.CHIEF_EDITOR) {
    res.render('author/desking/chiefEditor', {
      title: 'home',
      articles,
      currentUser,
      admin: false,
    });
  } else if (currentUser.position === POSITION.ADMIN) {
    res.redirect('/author/_admin');
  }
};

const deskProcess = async (req, res, next) => {
  const articles = JSON.parse(JSON.stringify(req.body));
  // TODO: 로딩 페이지 띄우기
  // TODO: 데스크인 경우와 편집장인 경우 나누기
  // TODO: 데스크가 출고를 off 하고 am7, pm7을 ON 하고 보내면 beforeUpdate 훅에서 에러 발생하게 만들자
  const currentUser = await getCurrentUser(req.user.id);
  if (currentUser.position === POSITION.DESK) {
    await Promise.all(
      Object.entries(articles).map(async (data) => {
        const article = await Article.findOne({ where: { id: +data[0] } });
        if (article.status < ARTICLE.CONFIRMED) {
          if (!Array.isArray(data[1])) {
            article.status = +data[1] === 1 ? 3 : 2;
          } else {
            article.status = +data[1][0] === 1 ? 3 : 2;
            article.am7 = +data[1][1];
            article.pm7 = +data[1][2];
          }
          await article.save();
        }
      }),
    );
  } else if (currentUser.position > POSITION.DESK) {
    // TODO: 게재 일자도 기사 모델의 칼럼에 추가하자
    // TODO: 편집장이 출고가 안된걸 게재하려고 하면 beforeUpdate 훅에서 에러 발생하게 하자
    // TODO: beforeUpdate 에서 게재가 되었다면 am7, pm7은 off하자
    await Promise.all(
      Object.entries(articles).map(async (article) => {
        if (!Array.isArray(article[1])) {
          await Article.update(
            { status: +article[1] === 1 ? ARTICLE.RELEASED : ARTICLE.COMPLETED },
            { where: { id: +article[0] } },
          );
        } else {
          if (article[1].length === 3) {
            const updateContent = {
              status: +article[1][0] === 1 ? ARTICLE.CONFIRMED : ARTICLE.RELEASED,
              am7: +article[1][2],
              pm7: +article[1][3],
            };
            await Article.update(updateContent, {
              where: { id: +article[0] },
              individualHooks: true,
            });
          } else {
            let status;
            if (+article[1][1] === 1) {
              status = ARTICLE.CONFIRMED;
            } else {
              status = +article[1][0] === 1 ? ARTICLE.RELEASED : ARTICLE.COMPLETED;
            }
            const updateContent = {
              status,
              am7: +article[1][2],
              pm7: +article[1][3],
            };
            await Article.update(updateContent, {
              where: { id: +article[0] },
              individualHooks: true,
            });
          }
        }
      }),
    );
  }
  res.redirect('/author');
};

const logout = async (req, res, next) => {
  if (req.user) {
    req.logout();
    req.session.save(() => {
      return res.redirect('/author');
    });
  } else {
    res.redirect('/author');
  }
};

const signup = async (req, res, next) => {
  const { email, password, confirm, name, code, contact } = req.body;
  const photo = req.file ? req.file.filename : null;
  if (password !== confirm) {
    alert('비밀번호가 같지 않습니다.');
    return res.redirect('/author/signup');
  }
  // TODO: Author Service 객체 만들어서 추상화하기
  try {
    let position = 1;
    if (+code[0] === 1) {
      position = POSITION.CHIEF_EDITOR;
    } else if (code.length == 1 && +code[0] < 9) {
      position = POSITION.DESK;
    }
    await Author.create({ email, password, name, code, position, contact, photo });
    await Invitation.update({ state: 2 }, { where: { email } });
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
};

const newArticle = async (req, res, next) => {
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
  const currentUser = await getCurrentUser(req.user?.id);
  if (!currentUser) res.redirect('/author/login');
  res.render('admin/index', { title: 'admin home', currentUser, admin: true });
};

const invite = async (req, res, next) => {
  const userList = await Invitation.findAll({});
  const currentUser = await getCurrentUser(req.user?.id);
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
const decision = async (req, res, next) => {
  const { approved, declined, email, code } = req.body;
  if (approved === '' && code !== '0') {
    // 이메일 발송
    const candidate = await Invitation.findOne({ where: { email } });
    const invitationId = candidate.id;
    candidate.state = INVITATION.APPROVAL;
    candidate.code = code;
    sendMail(invitationId, email, code);
    await candidate.save();
  } else if (declined === '') {
    // 가입거절
    await Invitation.update({ state: INVITATION.REFUSED }, { where: { email } });
  } else if (code === '0') {
    alert('역할을 설정해 주십시오!');
  }
  res.redirect('/author/_admin/invitation');
};

const inviteRequest = async (req, res, next) => {
  const { invite, email, name, code } = req.body;
  if (email === '' || name === '' || code === '') {
    alert('빈 항목이 있어서는 안됩니다.');
  } else if (invite === '') {
    try {
      await Invitation.create({ email, name, code, state: INVITATION.APPROVAL });
      const candidate = await Invitation.findOne({ where: { email } });
      const invitationId = candidate.id;
      sendMail(invitationId, email, code);
    } catch (error) {
      alert('에러가 발생하였습니다!');
    }
  }
  res.redirect('/author/_admin/invitation');
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
  const { email, name, code } = candidate;
  const user = { email, name, code };
  res.render('author/signup', { title: 'signup', user });
};

const editMeetingPage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user?.id);
  res.render('author/editMeeting', { title: 'edit-meeting', currentUser, admin: false });
};

const newArticlePage = async (req, res, next) => {
  const currentUser = await getCurrentUser(req.user?.id);
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
  const currentUser = await getCurrentUser(req.user?.id);
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
  const currentUser = await getCurrentUser(req.user?.id);
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

module.exports = {
  index,
  deskProcess,
  logout,
  signup,
  newArticle,
  editArticle,
  preSignup,
  preSignupRequest,
  admin,
  invite,
  decision,
  inviteRequest,
  loginPage,
  signupPage,
  editMeetingPage,
  newArticlePage,
  editArticlePage,
  myArticlePage,
  previewPage
};
