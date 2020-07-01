import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const code = {
  authorizationCode: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  redirectUri: {
    type: String,
    required: true
  },
  scope: {
    type: String,
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

const codeSchema = new Schema(code);

export default mongoose.model('AuthorizationCode', codeSchema);
