module.exports = {
    // appName: 'admin-api-v2',
    port: 3000,
    mode: 'default',
    debug: {
      request: ['error', 'info'],
      log: ['info', 'error', 'warning']
    },
    constants: {
    },
    connections: {
      db: process.env.DB,
      PORT : process.env.PORT,
      logDB: process.env.LOG_DB
    },
    // encryptionKey: process.env.CM_SECRET_KEY
  }
  