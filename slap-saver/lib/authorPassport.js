const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Author } = require('../models');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    return done(null, user);
  });
    
  // NOTE: deserializeUser는 페이지 들어올 때 마다 실행됨
  passport.deserializeUser(function(author, done) {
    return done(null, author);
  });
    
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      const author = await Author.findOne({where: {email: username}});
      if (!author) { 
        return done(null, false, { message: '해당 유저 없음' });
      };
      if (!await author.validPassword(password)) {
        return done(null, false, { message: '비밀번호 틀림' });
      }
      return done(null, author);
    }
  ))
  return passport;
}