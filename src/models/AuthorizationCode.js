import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

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

const codeSchema = new Schema(code);

codeSchema.statics.getCode = async function(authorizationCode) {
  const code = await this.findOne({ authorizationCode })
    .populate('client')
    .populate('user').lean().exec();

  return code;
}

codeSchema.statics.saveCode = async function(code, client, user) {
  const {
    authorizationCode,
    expiresAt,
    redirectUri,
    scope
  } = code;
  const newCode = new this({
    authorizationCode,
    expiresAt,
    redirectUri,
    scope,
    client: client._id,
    user: user._id,
    userType: user.constructor.modelName
  });

  await newCode.save();
  return newCode;
}

codeSchema.statics.deleteCode = async function(authorizationCode) {
  return await this.deleteOne({ authorizationCode });
}

export default mongoose.model('AuthorizationCode', codeSchema);
