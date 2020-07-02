import mongoose from 'mongoose';
import config from '../config';

const connect = (done) => {
  mongoose.connect(config.mongoTestUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, err => {
    if (err) throw new Error(err);
    console.log('Connected to database....');
    done()
  })
}

const disconnect = done => {
  mongoose.disconnect(err => {
    if (err) throw new Error(err);
    console.log('Database disconnected...')
    done();
  })
}

export default { connect, disconnect };