const { closeConnection, dbConn } = require("../utils/database/SqlConnection");

const submitContact = (request) => {
    return new Promise(function (resolve, reject) {
        let {name, email, phoneNumber, message} = request.body
      const subSqlQuery = `CALL procCreateContact(?, ?, ?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database not connected !!", err);
        } else {
          connection.query(subSqlQuery,[name, email, phoneNumber, message] ,(err, result) => {
            console.log("result", result)
            closeConnection(connection);
            if (result) {
              resolve(result);
            } else {
              reject(err);
            }
          });
        }
      });
    });
  };


  const getContactList = (request) => {
    return new Promise(function (resolve, reject) {
        let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
        let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
      const subSqlQuery = `CALL procGetAllContactList(?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database not connected !!", err);
        } else {
          connection.query(subSqlQuery,[pageNumber, pageSize] ,(err, result) => {
            console.log("result", result)
            closeConnection(connection);
            if (result) {
              resolve(result);
            } else {
              reject(err);
            }
          });
        }
      });
    });
  };


  const getAllEnquiryCount = async (request) => {
    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procCountEnquiry()`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(SqlQuery, (err, result) => {
            closeConnection(connection);
            if (err) {
              reject(err);
            } 
            resolve(result[0][0])
            console.log("result", result[0][0])
          });
        }
      });
    });
  };

  module.exports = {
    submitContact, getContactList, getAllEnquiryCount
  }