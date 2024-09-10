/*const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


 const app = express();

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoutes);
app.use('/records', rbacMiddleware.checkPermission('read_record'), recordsRoutes);

// MongoDB connection
const mongoConnUrl = "mongodb://localhost/test";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB database named 'ascendion'"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
}); */


const User = require('./models/user');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const dbUrl = process.env.DB_URL;
mongoose.connect("mongodb://localhost/test",{})
    .then(()=>{
        console.log('MongoDB is available.');
    })
    .catch(err=>{
        console.log(err);
        process.exit(0);
    })

const sessionOption = {
    secret : "Secret",
    resave : false,
    saveUninitialized: false
}


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(expressSession(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routers  
const recordsRoutes = require('./routes/records');
const authRoutes = require('./routes/auth');

app.use('/auth',authRoutes);
app.use('/records',recordsRoutes);

module.exports = app;
