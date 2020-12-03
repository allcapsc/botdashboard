const rateLimit = require('express-rate-limit');
const RateLimitStore = require('rate-limit-mongo');
const { MONGO_URL } = require("../config.js")

module.exports = rateLimit({
  max: 300,
  message: 'You are being rate limited.',
  store: new RateLimitStore({ uri: MONGO_URL }),
  windowMs: 60 * 1000
});