const Customer = require('./../models/Customer');

const createError = require('http-errors');

exports.getAll = (req, res) => {
  Customer.find({}, (err, customers) => {
    if (err) throw createError(500, err);
    res.status(200).json(customers);
  });
};

exports.getById = (req, res) => {
  Customer.findById(req.params.id, (err, customer) => {
    if (err) throw createError(500, err);
    res.status(200).json(customer);
  });
};

exports.getbyName = (req, res, next) => {
  const name = new RegExp(req.params.name);
  Customer.find({}).or([{
    firstName: name
  }, {
    lastName: name
  }]).exec((err, customers) => {
    if (err) next(createError(500, err));
    res.status(200).json(customers);
  });
};

exports.createCustomer = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password
  } = req.body;
  const customer = new Customer({
    firstName,
    lastName,
    email,
    phone
  });
  Customer.register(customer, password, err => {
    if (err) next(createError(500, err));
    res.json(req.User);
  });
};

exports.removeAll = (req, res, next) => {
  Customer.deleteMany({}, (err, count) => {
    if (err) next(createError(500, err));
    return res.json({
      deletedCount: count
    });
  });
};

exports.deleteAccount = (req, res, next) => {
  const user = req.user;
  if (!user) next(createError(401, 'Authentication needed'));else {
    Customer.deleteOne({
      _id: user._id
    }, (err, count) => {
      if (err) next(createError(500, err));
      return res.json({
        deletedCount: count
      });
    });
  }
};