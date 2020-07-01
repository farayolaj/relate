const express = require('express');
const router = express.Router();
// const CustomerController = require('../controllers/CustomerController');
const passport = require('passport');

router.post('/customers/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

// router.post('/customers/logout', (req, res) => )
module.exports = router;