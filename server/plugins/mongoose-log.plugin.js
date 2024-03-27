'use strict'

const db = require('mongoose')
const Glob = require('glob')
db.Promise = require('bluebird')
let dbLogConn = null

exports.plugin = {
  async register(server, options) {
    try {
        dbLogConn = await db.createConnection(options.connections.logDB)
      // db.set('debug', true);

      dbLogConn.on('connected', () => {
        server.log(['mongoose', 'info'], 'dbLogConn Mongo Database connected')
      })

      dbLogConn.on('disconnected', () => {
        server.log(['mongoose', 'info'], 'dbLogConn Mongo Database disconnected')
      })
      server.decorate('server', 'DB-Log', dbLogConn)
      process.on('SIGINT', async () => {
        await dbLogConn.close()
        server.log(
          ['mongoose', 'info'],
          'Mongo Database disconnected through app termination'
        )
        process.exit(0)
      })

      const models = Glob.sync('server/log-models/*.js')
      models.forEach(model => {
        require(`${process.cwd()}/${model}`)
      })

    } catch (err) {
      console.log(err)
      throw err
    }
  },
  mainDbLogConn() {
    return dbLogConn
  },
  name: 'mongoose_log_connector',
  version: require('../../package.json').version
}






