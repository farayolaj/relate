const User = require('./User');

const mongoose = require('mongoose');

const config = require('../config');

const {
  ObjectId
} = mongoose.Types;
beforeEach(done => {
  mongoose.connect(config.mongoTestUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, err => {
    if (err) throw new Error(err);
    console.log('Connected to database....');
    done();
  });
});
afterEach(async done => {
  const delUser = await User.deleteMany({});
  console.log(delUser);
  mongoose.disconnect(err => {
    if (err) throw new Error(err);
    console.log('Database disconnected...');
    done();
  });
});
test('create new user', async () => {
  const newUser = new User({
    firstName: 'Alabi',
    lastName: 'Farayola',
    email: 'alabi@farayola.com',
    password: 'AlabiFarayola'
  });
  const user = await newUser.save(); // console.log(user)

  expect(user).toMatchObject({
    _id: expect.any(ObjectId),
    firstName: expect.stringMatching('Alabi'),
    lastName: expect.stringMatching('Farayola'),
    email: expect.stringMatching('alabi@farayola.com')
  });
});