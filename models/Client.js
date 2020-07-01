import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const client = {
  redirectUris: [String],
  grants: [String],
  accessTokenLifetime: Number,
  refreshTokenLifetime: Number
};

const clientSchema = new Schema(client);

export default mongoose.model('Client', clientSchema);
