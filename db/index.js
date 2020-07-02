import mongoose from 'mongoose';
import config from '../config';

const connect = async () => {
  try {
    await mongoose.connect(config.mongoTestUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log('Connected to database');
  } catch (err) {
    console.log('Error connecting to database');
  }
}

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (err) {
    console.log('Error disconnecting from database');
  }
}

export default { connect, disconnect };