const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const config = require('./config');

const routes = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send('Currently out of service');
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  else console.log('Server started on port:', config.port);
});
