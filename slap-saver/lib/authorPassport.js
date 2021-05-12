const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const alert = require('alert');
const { Author } = require('../models');

module.exports = (app) => {
  app.use(
    session({
      store: new FileStore(),
      secret: 'anything',
      resave: false,
      saveUninitialized: true,
      cookie: { path: '/author' },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // NOTE: 객체를 받아서 문자열을 리턴해야한다.
  // NOTE: 동기화가 맞지 않아서 새로고침을 한번 더 해야한다..
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  // NOTE: 문자열을 인자로 받아서 객체를 리턴해야한다.
  passport.deserializeUser(async (id, done) => {
    const author = await Author.findByPk(id);
    return done(null, author);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (username, password, done) => {
        const author = await Author.findOne({ where: { email: username } });
        if (!author) {
          alert('유저 없음');
          return done(null, false, { message: '해당 유저 없음' });
        }
        if (!(await author.validPassword(password))) {
          alert('비밀번호 틀림');
          return done(null, false, { message: '비밀번호 틀림' });
        }
        return done(null, author);
      },
    ),
  );
  return passport;
};
