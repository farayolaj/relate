const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = {
  time: Date,
  by: {
    type: ObjectId,
    ref: 'Customer'
  },
  with: {
    type: ObjectId,
    ref: 'Business'
  },
  status: String
};

const bookingSchema = new Schema(schema);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;