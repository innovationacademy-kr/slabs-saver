const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const alert = require('alert');
const { Subscriber } = require('../models');

module.exports = (app) => {
  app.use(
    session({
      secret: 'anything',
      resave: false,
      saveUninitialized: true,
      cookie: { path: '/subscriber' },
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
    const subscriber = await Subscriber.findByPk(id);
    return done(null, subscriber);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (username, password, done) => {
        const subscriber = await Subscriber.findOne({ where: { email: username } });
        if (!subscriber) {
          alert('유저 없음');
          return done(null, false, { message: '해당 유저 없음' });
        }
        if (!(await subscriber.validPassword(password))) {
          alert('비밀번호 틀림');
          return done(null, false, { message: '비밀번호 틀림' });
        }
        return done(null, subscriber);
      },
    ),
  );
  return passport;
};
