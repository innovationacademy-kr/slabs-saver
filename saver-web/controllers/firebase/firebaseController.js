var admin;
const { Article } = require('../../models');

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

const postFirebaseArticle = async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.articleId } });

  if (!admin) setAdmin();
  try {
    const message = {
      topic: category[article.category],
      data: {
        title: article.headline,
        message: unescape(article.briefing),
        url: `https://thesaver.io/articles/detail/${article.id}`,
      },
    };
    await admin.messaging().send(message);
    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error });
  }
};

const pushPage = async (req, res) => {
  const articles = await Article.findAll({});
  res.render('user/pushPage', {
    articles,
  });
};

module.exports = { postFirebaseMessage, pushPage, postFirebaseArticle };
