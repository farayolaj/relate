import User from './User';
import db from '../db';
import { Types } from 'mongoose';

const { ObjectId } = Types;

beforeEach((done) => {
  db.connect(done);
})

afterEach(async (done) => {
  const delUser = await User.deleteMany({});
  console.log(delUser);
  db.disconnect(done);
})

test('create new user', async () => {
  const newUser = new User({
    firstName: 'Alabi',
    lastName: 'Farayola',
    email: 'alabi@farayola.com',
    password: 'AlabiFarayola'
  });

  const user = await newUser.save();
  // console.log(user)
  expect(user).toMatchObject({
    _id: expect.any(ObjectId),
    firstName: expect.stringMatching('Alabi'),
    lastName: expect.stringMatching('Farayola'),
    email: expect.stringMatching('alabi@farayola.com')
  });
})