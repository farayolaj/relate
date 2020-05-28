const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = {
  name: {
    type: String,
    required: `You don't want to sell nameless products`,
  },
  price: Number,
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }],
  category: String,
  seller: {
    type: ObjectId,
    ref: 'Business'
  },
  stars: {
    type: Number,
    default: 0
  },
  description: String,
  photos: [String],
  cover: String
};

const productSchema = new Schema(schema);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;