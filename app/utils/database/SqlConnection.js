'use strict'
const env = process.env.NODE_ENV || 'development'
//console.log("env", env)
const config = require(__dirname + '/../common/config.json')['production']
//console.log("config", config)
const mysql = require('mysql2')

const dbConn = mysql.createPool({
  connectionLimit: 100,
  multipleStatements: true,
  waitForConnections: true,
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database
})

// close connections
const closeConnection = (connection) => {
  // connection.sequenceId = 0;
  return connection.destroy();
};

module.exports = {
  dbConn,
  closeConnection
}
