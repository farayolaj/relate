const express = require('express');
const router = express.Router();
const path = require('path');
//const User = require('./../models/User');
//const asyncHandler = require('exress-async-handler');

router.get('/', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});

/*
router.post('/signup', asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = new User({ email });
  const newUser = await user.save();
  res.json({ secretKey: newUser.key });
}));
*/

module.exports = router;
