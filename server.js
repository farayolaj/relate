const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session')

const config = require('./config');

const routes = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser({
  secret: 'I will change the secret later'
}));
// GIVE OPTIONS TO EXPRESS SESSION
app.use(expressSession({
  secret: 'I will change the secret later',
  resave: true
}))
app.use(passport.initialize());
app.use(passport.session())

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) res.status(500).send('I think I need help, TTYL');
  else res.status(err.status).send(err.message);
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  else console.log('Server started on port:', config.port);
});
