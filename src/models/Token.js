import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

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
  client: {
    type: ObjectId,
    required: true,
    ref: 'Client'
  },
  user: {
    type: ObjectId,
    required: true,
    refPath: 'userType'
  },
  userType: {
    type: String,
    enum: ['Customer', 'Business'],
    default: 'Customer'
  }
};

const tokenSchema = new Schema(token);

tokenSchema.statics.getAccessToken = async function(accessToken) {
  const token = await this.findOne({ accessToken })
    .select('accessToken accessTokenExpiresAt scope client user')
    .populate('client')
    .populate('user')
    .lean();
  return token;
}

tokenSchema.statics.getRefreshToken = async function(refreshToken) {
  const token = await this
    .findOne({ refreshToken })
    .select('refreshToken refreshTokenExpiresAt scope client user')
    .populate('client')
    .populate('user')
    .lean().exec();
  
  return token;
}

tokenSchema.statics.saveToken = async function(token, client, user) {
  const {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    scope
  } = token;

  const newToken = new this({
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    scope,
    client: client._id,
    user: user._id,
    userType: user.constructor.modelName
  });

  await newToken.save();
  return newToken;
}

tokenSchema.statics.deleteAccessToken = async function(accessToken) {
  return await this.deleteOne({ accessToken });
}

tokenSchema.statics.deleteRefreshToken = async function(refreshToken) {
  return await this.deleteOne({ refreshToken });
}

export default mongoose.model('Token', tokenSchema);
