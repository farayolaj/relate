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

function getAccessToken(accessToken) {
  token = await Token.find({accessToken});
}

function getRefreshToken(refreshToken) {

}

function getAuthorizationCode(authorizationCode) {
  
}

function getClient(clientId, clientSecret) {
  
}

function saveToken(token, client, user) {
  
}

function saveAuthorizationCode() {
  
}

function revokeToken() {
  
}

function revokeAuthorizationCode() {
  
}

/*interface Token {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  scope?: string;
}*/