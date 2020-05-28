const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = {
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  email: {
    type: String,
    required: 'E-mail is also required',
    match: [/^.+@.+\..+$/, 'Enter valid E-mail, please']
  },
  phone: {
    type: String,
    required: 'Phone number is required',
    match: [/^\d+$/, 'Enter valid phone number']
  },
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }],
  profilePic: String,
  follows: [{
    type: ObjectId,
    ref: 'Business'
  }]
};

const customerSchema = new Schema(schema);
customerSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

customerSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = customerSchema; 
