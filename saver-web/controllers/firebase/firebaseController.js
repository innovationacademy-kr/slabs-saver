var admin = require('firebase-admin');
const { Article } = require('../../models');
const POSITION = require('../../lib/constants/position');
const getCurrentUser = require('../../lib/getCurrentUser');
const STATUS = require('../../lib/constants/articleStatus');
const { constants } = require('../../lib/converter');

try {
  const serviceAccount = require('../../config/firebase-adminsdk.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (e) {
  admin = null;
  console.log("can't find firebase-adminsdk.json");
}

const postFirebaseMessage = async (req, res) => {
  try {
    const message = req.body.message;
    if (admin == null) throw new Error("can't find firebase-adminsdk.json");
    await admin.messaging().send(message);
    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

const pushPage = async (req, res) => {
  const currentUser = await getCurrentUser(req.user?.id);
  if (!currentUser) return res.redirect('/author/login');
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const limit = 15;
  const articles = await Article.findAll({
    where: { status: STATUS.CONFIRMED }, //ne == not equal
    offset: page * limit,
    limit: limit,
    order: [['publishedAt', 'DESC']],
  });

  var totalPage = await Article.count({ where: { status: STATUS.CONFIRMED } });
  totalPage = Math.floor(totalPage / limit);

  const underLimitPage = page - 2 < 0 ? 0 : page - 2;

  res.render('author/pushPage', {
    articles,
    totalPage,
    page,
    underLimitPage,
    category: constants.category,
    POSITION,
    STATUS,
    currentUser,
  });
};

const pushSendPage = async (req, res) => {
  const currentUser = await getCurrentUser(req.user?.id);
  if (!currentUser) return res.redirect('/author/login');
  const article = await Article.findOne({ where: { id: req.params.articleId } });
  res.render('author/pushSendPage', {
    article,
    category: constants.category,
    POSITION,
    STATUS,
    currentUser,
  });
};

module.exports = { postFirebaseMessage, pushPage, pushSendPage };
