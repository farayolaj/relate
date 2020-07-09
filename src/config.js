require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  mongoPort: process.env.MONGO_PORT,
  sessionSecret: process.env.SESSION_SECRET,
  mongoTestUrl: process.env.MONGO_TEST_URL,
  mongoMsSystemBinary: process.env.MONGOMS_SYSTEM_BINARY
};
