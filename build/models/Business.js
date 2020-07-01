const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const schema = {
  name: {
    type: String,
    required: 'Business name is required'
  },
  email: {
    type: String,
    required: 'Business e-mail is required',
    match: [/^.+@.+\..+$/, 'E-mail must be valid']
  },
  phone: {
    type: String,
    required: 'Phone number is required',
    match: [/^\d+$/, 'Phone number must be valid']
  },
  loc: {
    lat: String,
    long: String
  },
  address: {
    type: String,
    required: 'Your business address is required'
  },
  opens: {
    type: String,
    match: /^\d{4}$/,
    required: 'Opening time required'
  },
  closes: {
    type: String,
    match: /^\d{4}$/,
    required: 'Closing time required'
  },
  stars: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }],
  tags: [String],
  description: {
    type: String,
    required: 'You want your customers to know about you, right?'
  },
  profilePic: String,
  plan: {
    name: {
      type: String,
      default: 'Basic'
    },
    expires: Date,
    dateBought: {
      type: Date,
      default: Date.now
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  followedBy: [{
    type: ObjectId,
    ref: 'Customer'
  }],
  industries: [{
    type: String,
    enum: ['education', 'fashion & beauty', 'travel', 'electrical & electronic', 'hospitality', 'health', 'finance', 'entertainment', 'food', 'automobile', 'others']
  }],
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }]
};
const businessSchema = new Schema(schema);
businessSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});
const Business = mongoose.model('Business', businessSchema);
module.exports = Business;