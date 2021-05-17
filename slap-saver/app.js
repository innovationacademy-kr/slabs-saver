require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./models').sequelize;

const app = express();
sequelize.sync();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: 유저 작업을 할 때는 새로운 passport 를 만들어서 작업할 것
const authorPassport = require('./lib/authorPassport')(app);
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/author')(authorPassport);
const articlesRouter = require('./routes/articles');

// NOTE: routing
app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
