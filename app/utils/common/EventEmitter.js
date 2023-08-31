const Events = require('events')
const { closeConnection, dbConn } = require('../database/SqlConnection')
const Log = require("../../utils/logger/logger").log

const EventEmitter = new Events.EventEmitter()

const auditEmitter = (eventName, message) => {
  return new Promise(() => {
    EventEmitter.once(eventName, function (message) {
      message.push(new Date())
      message.push(new Date())
      const subSqlQuery = 'CALL procAddAuditLog(?,?,?,?,?,?)'
      dbConn.getConnection((err, conn) => {
        if (err) {
          console.log('Database Connection Failed !!!', err)
        } else {
          conn.query(subSqlQuery, message, () => {
            closeConnection(conn)
          })
        }
      })
    })
    EventEmitter.emit(eventName, message)
  }).catch((error) => {
    console.log(error)
  })
}

const errorEmitter = (eventName, message) => {
  console.log("messages", message)
  return new Promise(() => {
    EventEmitter.once(eventName, function () {
      message.push(new Date())
      message.push(new Date())
      Log.error(message);
      const subSqlQuery = 'CALL procAddErrorLog(?,?,?,?,?,?)'
      dbConn.getConnection((err, conn) => {
        if (err) {
          console.log('Database Connection Failed !!!', err)
        } else {
          conn.query(subSqlQuery, message, () => {
            closeConnection(conn)
          })
        }
      })
    })
    EventEmitter.emit(eventName, message)
  }).catch((error) => {
    console.log(error)
  })
}

module.exports = { auditEmitter, errorEmitter }
