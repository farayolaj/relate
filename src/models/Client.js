import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const client = {
  // add client secret and client id
  redirectUris: [String],
  grants: [String],
  accessTokenLifetime: Number,
  refreshTokenLifetime: Number
};

const clientSchema = new Schema(client);

clientSchema.statics.deleteClient = async function(clientId) {
  return await this.deleteOne({ _id: clientId });
}

clientSchema.statics.getClient = async function(clientId, clientSecret) {
  const client = await this.findById(clientId).exec();
  if (client.authenticate(clientSecret)) return client;
}

clientSchema.plugin(passportLocalMongoose, {
  usernameField: '_id'
});

export default mongoose.model('Client', clientSchema);
// module.exports = mongoose.model('Client', clientSchema);
