
var createError = require('http-errors');
var express = require('express');
const cors= require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var authorsRouter = require('./routes/authors');
var todoRouter= require('./routes/todo');
var registerationRouter = require('./routes/registeration');
var booksRouter = require('./routes/books');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/authors',authorsRouter);
app.use('/todo',todoRouter);
app.use('/registeration',registerationRouter);
app.use('/categories',categoryRouter);
app.use('/books',booksRouter);
app.use('/product',productRouter);

let mongoConnurl ="mongodb://localhost/ascendion";
mongoose.connect(mongoConnurl);
let db = mongoose.connection;
db.on("error",function(){
  console.log("error came in connecting");
});
db.on("connected",function(){
  console.log("connected to the db");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
