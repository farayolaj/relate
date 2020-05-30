const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');


router.get('/', CustomerController.getAll);
router.get('/me', (req, res) => {
  const user = req.user;
  if (!user) res.status(401).json({
    msg: 'You need to login'
  });
  else res.json(user);
});
router.get('/:name', CustomerController.getbyName);
router.post('/', CustomerController.createCustomer);
router.delete('/', CustomerController.removeAll);


module.exports = router;
