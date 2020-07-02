// const Client = require('../Client.js');
// const { Types } = require('mongoose');

import Client from '../Client.js';
import { Types } from 'mongoose';
import faker from 'faker';
import db from '../../db';

const { ObjectId } = Types;

beforeEach(async () => {
  await db.connect();
})

afterEach(async () => {
  await db.disconnect();
})

describe('Test Client model', () => {

  const completeClient = {
    grants: [
      faker.lorem.word(),
      faker.lorem.word()
    ],
    redirectUris: [
      faker.internet.email(),
      faker.internet.email()
    ],
    accessTokenLifetime: faker.random.number(),
    refreshTokenLifetime: faker.random.number(),
    password: faker.internet.password()
  }

  beforeEach(async () => {
    const client = new Client(completeClient);
    await client.setPassword(completeClient.password);
    completeClient.ID = client._id;
    await client.save();
  })
  
  afterEach(async () => {
    await Client.deleteMany({});
  })

  test('get registered client', async () => {
    const client = await Client.getClient(completeClient.ID);

    expect(client).toHaveProperty('_id', completeClient.ID);
  })

  test('delete registered client', async () => {
    const res = await Client.deleteClient(completeClient.ID);

    expect(res).toHaveProperty('deletedCount', 1);
  })

})