var admin;
const { Article } = require('../../models');
const POSITION = require('../../lib/constants/position');
const getCurrentUser = require('../../lib/getCurrentUser');
const STATUS = require('../../lib/constants/articleStatus');

const category = {
  전체: 'total',
  경제: 'economy',
  정치: 'politics',
  국제: 'international',
  사회: 'social',
  문화: 'culture',
};


const setAdmin = () => {
  admin = require('firebase-admin');
  const serviceAccount = require('../../config/firebase-adminsdk.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

const postFirebaseMessage = async (req, res) => {
  if (!admin) setAdmin();
  try {
    const message = req.body.message;

    await admin.messaging().send(message);
    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
};

const pushPage = async (req, res) => {
  const currentUser = await getCurrentUser(req.user?.id);
	if (!currentUser) return res.redirect('/author/login');
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const limit = 15;
  const articles = await Article.findAll({
    offset: page * limit,
    limit: limit,
  });

  var totalPage = await Article.count({});
  totalPage = Math.floor(totalPage / limit);

  const underLimitPage = page - 2 < 0 ? 0 : page - 2;

  res.render('author/pushPage', {
    articles,
    category,
    totalPage,
    page,
    underLimitPage,
    POSITION,
    currentUser
  });
};

const pushSendPage = async (req, res) => {
  const currentUser = await getCurrentUser(req.user?.id);
	if (!currentUser) return res.redirect('/author/login');
  const article = await Article.findOne({ where: { id: req.params.articleId } });
  console.log(article.headline)
  res.render('author/pushSendPage', {
    article,
    category,
    POSITION,
    currentUser
  });
};

module.exports = { postFirebaseMessage, pushPage, pushSendPage };
