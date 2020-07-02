// const Client = require('../Client.js');
// const { Types } = require('mongoose');

import Client from '../Client.js';
import { Types } from 'mongoose';
import db from '../../db';

const { ObjectId } = Types;

beforeEach((done) => {
  db.connect(done);
})

afterEach(async (done) => {
  const delUser = await Client.deleteMany({});
  console.log(delUser);
  db.disconnect(done);
})

describe('Test Client model', function() {
  test('register new client', async function() {
    const client = new Client({
      grants: [
        'authorization_code',
        'password'
      ],
      redirectUris: [
        'allo.client.com',
        'world.client.com'
      ],
      accessTokenLifetime: 3600,
      refreshTokenLifetime: 42300
    });

    await Client.register(client, 'password');

    expect(client).toHaveProperty('_id', expect.any(ObjectId));
  })

  test.todo('get registered client')

  test.todo('delete registered client')
})