const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const schema = {
  title: String,
  content: String,
  comments: [{
    postedBy: String,
    content: String,
    datePosted: Date
  }],
  writtenOn: {
    type: ObjectId,
    refPath: 'recipient'
  },
  recipient: {
    type: String,
    enum: ['Business, Product'],
    default: 'Product',
    select: false
  }
};
const reviewSchema = new Schema(schema);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;