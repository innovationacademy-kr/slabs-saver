const jwt = require('jsonwebtoken');
var tokenKey = 'slab!#abcd';
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
    return res.status(403).json({
      server: '우리서버',
      success: false,
      message: 'not logged in',
    });
  }
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, tokenKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  const onError = (error) => {
    console.log(error);
    res.status(403).json({
      server: '우리서버',
      success: false,
      message: error.message,
    });
  };
  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};
module.exports = authMiddleware;
