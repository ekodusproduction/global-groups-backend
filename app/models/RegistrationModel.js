const { closeConnection, dbConn } = require("../utils/database/SqlConnection");


  // const Registration = async (request) => {
  //   let email = request.body.emailId;
  //   let name = request.body.name;
  //   let projectName = request.body.projectName;
  //   let message = request.body.message;
  //   let phoneNumber = request.body.phoneNumber;
  //   return new Promise(function (resolve, reject) {
  //     const sqlQuery = `CALL procEmailExistCheck(?)`;
  
  //     dbConn.getConnection((err, connection) => {
  //       if (err) {
  //         console.log("Database Connection Failed !!!", err);
  //       } else {
  //         connection.query(sqlQuery,[email], (err, result) => {
  //           closeConnection(connection);
  //           console.log("Result", result[0].length)
  //           if (err) {
  //             return reject(err);
  //           } else if (result[0].length != 0) {
  //               console.log("entered herer")
  //             let result = 1;
  
  //             return resolve(result);
  //           } else {
  //               try {
  //                 const sqlQuery1 = `CALL procRegistration(?, ?, ?, ?, ?)`;
                 
  //                 dbConn.getConnection((err, connection) => {
  //                   if (err) {
  //                     console.log("Database not connect !!", err);
  //                   } else {
  //                     connection.query(
  //                       sqlQuery1, [
  //                           name,
  //                           email,
  //                           projectName, 
  //                           message,
  //                           phoneNumber
  //                       ],
  //                       (err, result) => {
  //                         closeConnection(connection);
  //                         if (err) {
  //                           return reject(err);
  //                         }
  //                         resolve(result);
  //                       }
  //                     );
  //                   }
  //                 });
  //               } catch (error) {
  //                 return reject(error);
  //               }   
  //           }
  //         });
  //       }
  //     });
  //   });
  // };

  const Registration = async (request) => {
    let email = request.body.emailId;
    let name = request.body.name;
    let projectName = request.body.projectName;
    let message = request.body.message;
    let phoneNumber = request.body.phoneNumber;
    return new Promise(function (resolve, reject) {
      try {
        const sqlQuery1 = `CALL procRegistration(?, ?, ?, ?, ?)`;
       
        dbConn.getConnection((err, connection) => {
          if (err) {
            console.log("Database not connect !!", err);
          } else {
            connection.query(
              sqlQuery1, [
                  name,
                  email,
                  projectName, 
                  message,
                  phoneNumber
              ],
              (err, result) => {
                closeConnection(connection);
                if (err) {
                  return reject(err);
                }
                resolve(result);
              }
            );
          }
        });
      } catch (error) {
        return reject(error);
      } 
    });
  };


 
  const getEnquiryList = (request) => {
    return new Promise(function (resolve, reject) {
        let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
        let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
      const subSqlQuery = `CALL procGetAllEnquiryList(?, ?)`;
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

  const getAllOutReachCount = async (request) => {
    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procCountOutReach()`;
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
    Registration,
    getEnquiryList,
    getAllOutReachCount
  }