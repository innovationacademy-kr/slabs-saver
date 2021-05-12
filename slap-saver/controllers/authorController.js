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
  signup: async (req, res, next)=> {
    const { email, password, confirm, contact } = req.body;
    if (password !== confirm) {
      return res.redirect('/author/signup');
    }    
    try {
      await Author.create({ email, password, contact })
    } catch (error) {
      console.log('------- error message --------');
      error.errors.forEach((e) => {
        console.log(e.message)
      })
      console.log('------------------------------');
      return res.redirect('/author/signup');
    }
    return res.redirect('/login');
  },
};
