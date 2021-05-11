const { Author } = require('../models');

module.exports = {
  index: (req, res, next) => {
    res.render('author/index', { title: 'authors!!!' });
  },
  loginPage: (req, res, next) => {
    res.render('author/login', { title: 'login!!!' });
  },
  login: (req, res, next) => {
    res.send(req.body);
  },
  signupPage: (req, res, next) => {
    res.render('author/signup', { title: 'author page' });
  },
  signup: (req, res, next) => {
    const { email, password, confirm, contact } = req.body;
    if (password !== confirm) {
      return res.send('password not equal to value');
    }
    Author.create({ email, password, contact })
      .then((author) => {
        console.log('------- create success -------');
        console.log(author);
        console.log('------------------------------');
        res.redirect('/login');
      })
      .catch((err) => {
        console.log('------- create failed -------');
        console.log(err.errors);
        res.redirect('/author/signup');
        console.log('------------------------------');
      });
  },
};
