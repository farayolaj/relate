import express from 'express';
import { json, urlencoded } from 'body-parser';
// const cookieParser = require('cookie-parser');
import logger from 'morgan';
import { resolve } from 'path';
import passport from 'passport';
import expressSession from 'express-session';
import { sessionSecret, port } from './config';
import { Customer } from './models';
import db from './db';
import OAuthServer from 'express-oauth-server';
import OAuthModel from './auth/Oauth2Model';
import { customerRoutes, authRoutes } from './routes';


const app = express();

db.connect();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({extended: true}));
// GIVE OPTIONS TO EXPRESS SESSION
app.use(expressSession({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(Customer.createStrategy());
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

app.oauth = new OAuthServer({
  model: OAuthModel,
  grants: ['authorization_code', 'refresh_token'],
  debug: true
})

app.use(express.static(resolve(__dirname, '../public')));

app.use('/', authRoutes);
app.use('/customers', customerRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err) res.status(err.status || 500).send(err.message);
});
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log('Server started on port:', port);
});
