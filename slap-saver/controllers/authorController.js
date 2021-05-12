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
  signup: async (req, res, next) => {
    const { email, password, confirm, contact } = req.body;
    const photo = req.file ? req.file.filename : null;
    if (password !== confirm) {
      return res.redirect('/author/signup');
    }
    try {
      await Author.create({ email, password, contact, photo })
    } catch ({errors}) {
      console.log('------- error message --------');
      errors.forEach((e) => {
        console.log(e.message)
      })
      console.log('------------------------------');
      return res.redirect('/author/signup');
    }
    return res.redirect('/login');
  },
};
