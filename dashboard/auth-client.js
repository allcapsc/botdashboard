const { DASH_URL, ID, SECRET } = require('../config.js');
const OAuthClient = require('disco-oauth');

const AuthClient = new OAuthClient(ID, SECRET);

AuthClient.setRedirect(`${DASH_URL}/auth`);
AuthClient.setScopes('identify', 'guilds');

module.exports = AuthClient;