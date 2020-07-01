const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const config = require('./config');
const { Customer } = require('./models');

const { customerRoutes, authRoutes } = require('./routes');


mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  else console.log('Connected to database');
});


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// GIVE OPTIONS TO EXPRESS SESSION
app.use(expressSession({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(Customer.createStrategy());
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/customers', customerRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err) res.status(err.status || 500).send(err.message);
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  else console.log('Server started on port:', config.port);
});
