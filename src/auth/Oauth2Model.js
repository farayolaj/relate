import {Token, AuthorizationCode, Client} from '../models'

const model = {
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  saveAuthorizationCode,
  saveToken,
  revokeAuthorizationCode,
  revokeAccessToken,
  revokeRefreshToken
}

async function getAccessToken(accessToken) {
  const token = await Token.getAccessToken(accessToken);
  return token;
}

async function getRefreshToken(refreshToken) {
  const token = await Token.getRefreshToken(refreshToken);
  return token;
}

async function getAuthorizationCode(authorizationCode) {
  const code = await AuthorizationCode.getCode(authorizationCode);
  return code;
}

async function getClient(clientId, clientSecret) {
  const client = await Client.getClient(clientId, clientSecret);
  return client;
}

async function saveToken(token, client, user) {
  return await Token.saveToken(token, client, user);
}

async function saveAuthorizationCode(code, client, user) {
  return await AuthorizationCode.saveCode(code, client, user);
}

async function revokeAccessToken(token) {
  return !!(await Token.deleteAccessToken(token));
}

async function revokeRefreshToken(token) {
  return !!(await Token.deleteRefreshToken(token));
}

async function revokeAuthorizationCode(code) {
  return !!(await AuthorizationCode.deleteCode(code));
}

export default model;