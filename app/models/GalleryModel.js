const { closeConnection, dbConn } = require("../utils/database/SqlConnection");
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)
const path = require("path")
const fileUploads = require("../utils/middlewares/uploadMiddleware");

const uploadGallery = async (request) => {
    let propertyId = request.body.projectId;
    const uploadedFiles = request.modifiedFileName;
    console.log("Dinesh", propertyId, uploadedFiles)
     let fileData = []
     uploadedFiles.forEach(file => {
        let el = {}
        el['image_name'] = file;
        el['project_id'] = propertyId
        fileData.push(el)
      });
      console.log("fileData", fileData)
    return new Promise(function (resolve, reject) {
                try {
                  const sqlQuery = `CALL procGalleryUpload(?)`;
                  const jsonData = JSON.stringify(fileData);
                  dbConn.getConnection((err, connection) => {
                    if (err) {
                      console.log("Database not connect !!", err);
                    } else {
                      connection.query(
                        sqlQuery, [jsonData],
                        (err, result) => {
                          closeConnection(connection);
                          if (err) {

                            return reject(err);
                          }
                          let obj = { flag: true}
                          resolve(obj);
                        }
                      );
                    }
                  });
                } catch (error) {
                  return reject(error);
                }   
            
          });
        }
   
 const deleteGalleryItemById = async (request) => {
            let galleryItemId = request.body.galleryItemId;
            return new Promise(function (resolve, reject) {

                const sqlQuery = `CALL procCheckGalleryItemExist(?)`
                dbConn.getConnection((err, connection) => {
                  if (err) {
                    console.log("Database Connection Failed !!!", err);
                  } else {
                    connection.query(sqlQuery,[galleryItemId], async (err, result) => {
                      closeConnection(connection);
                      console.log("Result", result)
                        if(result[0][0].itemCount === 1){
                            console.log("enenenenen")
                            console.log(path.join(__dirname, '/../utils/images'))
                            await unlinkAsync(path.join(__dirname, '../../images/'+result[1][0].image_name))
                               try {
                        const subSqlQuery = `CALL procDeleteGalleryItem(?)`;
                        dbConn.getConnection((err, connection) => {
                          if (err) {
                            console.log("Database not connect !!", err);
                          } else {
                            connection.query(
                                subSqlQuery, [galleryItemId],
                              (err, result) => {
                                closeConnection(connection);
                                if (err) {
                                  return reject(err);
                                }
                                let obj = {notFound: false, deleted: true,  message: `Image Deleted Successfully`}
                                resolve(obj);
                              }
                            );
                          }
                        });
                      } catch (error) {
                        return reject(error);
                      } 
                        }else if(result[0][0].itemCount === 0){
                            let obj = { notFound: true, deleted: false, message: `No Data Found for Image Id ${galleryItemId} to Delete`}
                                resolve(obj)
                        }
                    })
                }
            })
                         
                    
                  });
                }
           
 const updateGalleryItemById = async (request) => {
                    let galleryItemId = request.body.galleryItemId;
                    const fileName = request.file.filename
                    console.log("fileName", fileName, galleryItemId)
                    const today = new Date()
                    return new Promise(function (resolve, reject) {
        
                        const sqlQuery = `CALL procCheckGalleryItemExist(?)`
                        dbConn.getConnection((err, connection) => {
                          if (err) {
                            console.log("Database Connection Failed !!!", err);
                          } else {
                            connection.query(sqlQuery,[galleryItemId], async (err, result) => {
                              closeConnection(connection);
                              console.log("Results", result)
                             
                                if(result[0][0].itemCount === 1){
                                    await unlinkAsync(path.join(__dirname, '/../utils/images/')+result[1][0].image_name)
                                       try {
                                        const fileName = request.file.filename
                                        console.log("fileName", fileName)
                                const subSqlQuery = `CALL procUpdateGalleryItemById(?, ?, ?)`;
                                dbConn.getConnection((err, connection) => {
                                  if (err) {
                                    console.log("Database not connect !!", err);
                                  } else {
                                    connection.query(
                                        subSqlQuery, [ fileName, galleryItemId, today],
                                      (err, result1) => {
                                        closeConnection(connection);
                                        if (err) {
                                          return reject(err);
                                        }
                                        let obj = {flag : true, message: "Image Updated Successfully"}
                                        resolve(obj);
                                      }
                                    );
                                  }
                                });
                              } catch (error) {
                                return reject(error);
                              } 
                                }else{
                                    const fileName = request.file.filename
                                    unlinkAsync(path.join(__dirname, '/../utils/images/')+fileName)
                                    let obj = {flag : false}
                                    resolve(obj);
                                }

                            //  await unlinkAsync(path.join(__dirname, '../images')+'/')
        
                           
                            })
                        }
                    })
                                 
                            
                          });
                        }

const getAllGalleryList = async (request)=>{
    return new Promise(function (resolve, reject) {
        try {
          const sqlQuery = `CALL procGetGalleryList()`;
          dbConn.getConnection((err, connection) => {
            if (err) {
              console.log("Database not connect !!", err);
            } else {
              connection.query(
                sqlQuery,
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
}


const getAllGalleryListByProjectId = async (request)=>{
    let projectId = request.params.projectId;
   
    console.log("projectIds", projectId)
    console.log("type", typeof projectId)
    return new Promise(function (resolve, reject) {
        try {
          // const sqlQuery = `SELECT * from gallery where project_id = ?`;
                     const sqlQuery = `CALL procGetGalleryListByProjectId(?)`;
          dbConn.getConnection((err, connection) => {
            if (err) {
              console.log("Database not connect !!", err);
            } else {
              connection.query(
                sqlQuery,
               [`${projectId.trim()}`],
                (err, result) => {
                  closeConnection(connection);
                  if (err) {
                    return reject(err);
                  }
                  console.log("Results", result)
                  resolve(result);
                }
              );
            }
          });
        } catch (error) {
          return reject(error);
        }   
    
  });
}
                   
  module.exports = {
    uploadGallery,
    deleteGalleryItemById,
    updateGalleryItemById,
    getAllGalleryList,
    getAllGalleryListByProjectId
  }