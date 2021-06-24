const express = require('express');
const router = express.Router();
const subscriberCtrl = require('../controllers/subscriberController')
const { s3ImageUpload } = require('../lib/aws/s3Uploader');
const getCurrentUser = require('../lib/getCurrentUser');


// TODO: 모든 url 에 적용하기
// const loggedIn = (req, res, next) => {
//   if (req.user) {
//     return next();
//   }
//   return res.redirect('/subscriber/login');
// };

// const alreadyLoggedIn = (req, res, next) => {
//   if (req.user) {
//     return res.redirect('/subscriber');
//   }
//   return next();
// };

module.exports = (passport) => {
//   router.get('/login', alreadyLoggedIn, subscriberCtrl.page.login);
//   router.post(
//     '/login',
//     passport.authenticate('local', {
//       successRedirect: '/author',
//       failureRedirect: '/author/login',
//     }),
//   );

// router.get('/login', subscriberCtrl.page.login);
router.get('/signup', subscriberCtrl.page.signup);

router.post('/signup', subscriberCtrl.request.signup);


  return router;
};
