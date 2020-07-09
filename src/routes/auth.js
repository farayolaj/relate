import express from 'express';
const router = express.Router();
// const CustomerController = require('../controllers/CustomerController');
import passport from 'passport';

router.post('/customers/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});


// router.get('/test', express.application.oa)

// router.post('/customers/logout', (req, res) => )
export default router;