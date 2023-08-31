const { v4: uuidv4 } = require('uuid');
const { closeConnection, dbConn } = require("../utils/database/SqlConnection");
const path = require('path');
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)


const createAmenity = (request) => {
  console.log("files",request.image)
 let {name} = request?.body
 const projectImageFile = request?.files?.image
 const projectImage =  projectImageFile?.name   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +projectImageFile?.name.split(".")[1].trim();
 const projectImagefilePath =  path.join(__dirname, '../../images/'+projectImage)

  return new Promise(function (resolve, reject) {
    const subSqlQuery = `CALL procCreateAmenity(?, ?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery,[name, projectImage], (err, result) => {
          closeConnection(connection);
          if (result) {
            projectImageFile.mv(projectImagefilePath)
                      let result = true;
          
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};


const addAmenity = (request) => {
    console.log("files",request.image)
   let {projectId, amenities} = request?.body
    return new Promise(function (resolve, reject) {
      const subSqlQuery = `CALL procAddAmenities(?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database not connected !!", err);
        } else {
          connection.query(subSqlQuery,[projectId, JSON.stringify(amenities)], (err, result) => {
            closeConnection(connection);
            if (result) {
                        let result = true;
            
              resolve(result);
            } else {
              reject(err);
            }
          });
        }
      });
    });
  };


  const getAmenitiesByProjectId = async (request) => {
const {projectId} = request?.params;
console.log("projectId", projectId)
    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procGetAmenitiesByProjectId(?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(SqlQuery,   [`${projectId.trim()}`], (err, result) => {
            closeConnection(connection);
            if (err) {
              reject(err);
            } 
            console.log("AmmenityResult", result)
            resolve(result)
           
          });
        }
      });
    });
  };
  const getAllAmenityList = async (request) => {

    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procGetAllAmenityList()`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(SqlQuery,  (err, result) => {
            closeConnection(connection);
            if (err) {
              reject(err);
            } 
            resolve(result[0])
            console.log("result", result[0])
          });
        }
      });
    });
  };
  
module.exports = {
    createAmenity,
    addAmenity,
    getAllAmenityList,
    getAmenitiesByProjectId
}
