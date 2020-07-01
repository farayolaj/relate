import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const token = {
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  accessTokenExpiresAt: {
    type: Date,
    required: true
  },
  refreshToken: {
    type: String,
    default: '',
    unique: true
  },
  refreshTokenExpiresAt: {
    type: Date,
    default: null
  },
  scope: {
    type: String,
    default: ''
  },
  clientId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
};

const tokenSchema = new Schema(token);

export default mongoose.model('Token', tokenSchema);
