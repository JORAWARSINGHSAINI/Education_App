const express = require('express')
const app = express(); 
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
var path = require('path');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost/education',{ useUnifiedTopology: true,useNewUrlParser:true });
mongoose.Promise = global.Promise;
require('./config/passport')(passport)

app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine", 'ejs')
app.use(express.static('public'))

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use("/",require('./routes/homepage'))
app.use("/login",require('./routes/login'))
app.use("/register",require('./routes/register'))
app.use("/dashboard",require('./routes/dashboard'))
app.use('/new_class', require('./routes/new_class'));
app.use('/new_subject', require('./routes/new_subject'));
app.use('/profile', require('./routes/profile'));
app.use('/student_api', require('./routes/student_api'));
app.use('/institution_api', require('./routes/institution_api'));

app.use(function(err, req, res, next){
  console.log(err); // to see properties of message in our console
  res.status(422).send({error: err.message});
});


app.listen(5000, () => {
    console.log(`Example app listening at 5000`)
  });