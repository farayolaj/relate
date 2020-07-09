const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = {
  author: {
    type: ObjectId,
    ref: 'Business'
  },
  tags: [String],
  cover: String,
  title: String,
  content: String,
  comments: [{
    postedBy: String,
    content: String,
    datePosted: Date
  }]
};

const postSchema = new Schema(schema);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;