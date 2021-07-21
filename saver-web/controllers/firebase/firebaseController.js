var admin;

const setAdmin = () => {
  console.log('log');
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

module.exports = postFirebaseMessage;
