import {Token, AuthorizationCode, Client} from '../models'

const model = {
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  saveAuthorizationCode,
  saveToken,
  revokeAuthorizationCode,
  revokeToken
}

async function getAccessToken(accessToken) {
  token = await Token.getAccessToken(accessToken);
  return token;
}

async function getRefreshToken(refreshToken) {
  token = await Token.getRefreshToken(refreshToken);
  return token;
}

async function getAuthorizationCode(authorizationCode) {
  
}

async function getClient(clientId, clientSecret) {
  
}

async function saveToken(token, client, user) {
  
}

async function saveAuthorizationCode(code, client, user) {
  
}

async function revokeAccessToken(token) {
  
}

async function revokeRefreshToken(token) {
  
}

async function revokeAuthorizationCode() {
  
}