const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = {
  firstName: {
    type: String,
    trim: true,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    trim: true,
    required: 'Last name is required'
  },
  email: {
    type: String,
    required: 'E-mail is required',
    trim: true,
    unique: 'E-mail exists already',
    match: [/^\w+@\w+\.\w+$/, 'Valid E-mail is required']
  }
};
const userSchema = new Schema(schema);
userSchema.plugin(require('passport-local-mongoose'), {
  usernameField: 'email'
});
module.exports = mongoose.model('User', userSchema);