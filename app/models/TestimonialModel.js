const { closeConnection, dbConn } = require("../utils/database/SqlConnection");
const path = require('path');
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)

const addTestimony = (request) => {
    return new Promise(function (resolve, reject) {
        let {name, designation, review, location} = request.body
        let image = null
      const subSqlQuery = `CALL procAddTestimony(?, ?, ?, ?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database not connected !!", err);
        } else {
          if(request.files?.image){
            const ImageFile = request?.files?.image
            console.log("imageFile", ImageFile)
            image =  ImageFile?.name   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +ImageFile?.name.split(".")[1].trim();
            const ImagefilePath =  path.join(__dirname, '../../images/'+image)
             console.log("path", path.join(__dirname, '../../images/'+image))
             ImageFile.mv(ImagefilePath)
          }
          connection.query(subSqlQuery,[name, designation, image, review, location] ,(err, result) => {
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


  const getTestimonyList = (request) => {
    return new Promise(function (resolve, reject) {
        let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
        let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
      const subSqlQuery = `CALL procGetTestimonyList(?, ?)`;
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

  module.exports = {
    addTestimony, getTestimonyList
  }