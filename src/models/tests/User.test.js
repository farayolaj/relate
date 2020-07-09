import User from '../User';
import db from '../../db';
import { Types } from 'mongoose';

const { ObjectId } = Types;

beforeEach(async () => {
  await db.connect();
})

afterEach(async () => {
  await User.deleteMany({});
  await db.disconnect();
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