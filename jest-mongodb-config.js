const config = require('./src/config');

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      systemBinary: config.mongoMsSystemBinary,
      skipMD5: true
    },
    autoStart: false
  }
};