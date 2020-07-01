import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const client = {
  // add client secret and client id
  redirectUris: [String],
  grants: [String],
  accessTokenLifetime: Number,
  refreshTokenLifetime: Number
};

const clientSchema = new Schema(client);

clientSchema.plugin(passportLocalMongoose, {
  usernameField: '_id'
});

export default mongoose.model('Client', clientSchema);
