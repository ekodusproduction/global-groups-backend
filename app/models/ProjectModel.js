const { v4: uuidv4 } = require('uuid');
const { closeConnection, dbConn } = require("../utils/database/SqlConnection");
const path = require('path');
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)
const writeFileAsync = promisify(fs.writeFile);
const getAllProjectList = async (request) => {
  let pageNumber =  request.query.pageNumber ? parseInt(request.query.pageNumber) : 1;;
  let pageSize = request.query.pageSize ? parseInt(request.query?.pageSize): 10;
  console.log("reuest", request.query)
let isActive  = request?.query?.isactive ? request?.query?.isactive : null
console.log("isActive", isActive)
  return new Promise(function (resolve, reject) {
    const SqlQuery = `CALL procGetAllProjectList(?, ?, ?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(SqlQuery,
           [pageNumber,pageSize , isActive],
            (err, result) => {
          closeConnection(connection);
          if (err) {
            reject(err);
          } 
        // console.log("result", result)
         console.log("result", result[0])
          resolve(result[0])
         
        });
      }
    });
  });
};

const getCommercialProjectById = (request) => {
  return new Promise(function (resolve, reject) {
    let propertyId = request.params.propertyId;
    console.log("propertyid", propertyId)
    const subSqlQuery = `CALL procGetCommercialPropertyById(?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery,[propertyId] ,(err, result) => {
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



const getResendtialProjectById = (request) => {
  return new Promise(function (resolve, reject) {
    let propertyId = request.params.propertyId;
    console.log("propertyid", propertyId)
    const subSqlQuery = `CALL procGetResedentialPropertyById(?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery, [propertyId], (err, result) => {
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

const getAllCommercialProject = (request) => {
  let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
  let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
  return new Promise(function (resolve, reject) {
    const subSqlQuery = `CALL procGetCommercialPropertyList(?,?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery, [pageNumber, pageSize], (err, result) => {
          closeConnection(connection);
          if (result) {
            console.log("commercial", result)
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};


const getAllResedentialProject = (request) => {
 
  let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
  let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
  return new Promise(function (resolve, reject) {
    const subSqlQuery = `CALL procGetResendtialPropertyList(?, ?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery,[pageNumber, pageSize], (err, result) => {
          closeConnection(connection);
          if (result) {
            console.log("resedentialResult", result)
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};


const createProject = async(request) => {

 let {projectName, area, address, city, state, pinCode, location, description, type, status, flatSize, floors} = request?.body
 let Id = uuidv4()
 Id = Id.replace(/-/g, "");
 console.log("id", Id)
 let projectPdf = null
 let architectureImage = null
 let projectImage = null
//  const projectImageFile = request?.files?.projectImage

//         let  projectImageFileWithoutExtention = path.parse(projectImageFile?.name).name
//         console.log("filenamewithoutExtension", projectImageFileWithoutExtention)
//         const projectImageExtension = path.extname(projectImageFile.name);
//         console.log("fileExtension", projectImageExtension)
//          const projectImageCleanName = projectImageFileWithoutExtention.replace(/\s/g, "_");
//         const projectImage =  projectImageCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +projectImageExtension;
//        const projectImagefilePath =  path.join(__dirname, '../../images/'+projectImage)

       request?.files.forEach( file => {
        if(file?.fieldname === "projectImage"){
          let  projectImageFileWithoutExtention = path.parse(file?.originalname).name
          console.log("filenamewithoutExtension", projectImageFileWithoutExtention)
          const projectImageExtension = path.extname(file.originalname);
          console.log("fileExtension", projectImageExtension)
           const projectImageCleanName = projectImageFileWithoutExtention.replace(/\s/g, "_");
           projectImage =  projectImageCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +projectImageExtension;
         const projectImagefilePath =  path.join(__dirname, '../../images/'+projectImage)
         console.log("projectImagapath", projectImagefilePath)
            const buffer = Buffer.from(file.buffer, "utf-8");
          writeFileAsync(projectImagefilePath, buffer);
        }
         if(file?.fieldname === "architectureMap"){
          let  architectureImageFileWithoutExtention = path.parse(file?.originalname).name
                console.log("architectureImageFileWithoutExtention", architectureImageFileWithoutExtention)
                const architectureImageExtension = path.extname(file.originalname);
                console.log("fileExtension", architectureImageExtension)
                 const architecctureImageCleanName = architectureImageFileWithoutExtention.replace(/\s/g, "_");
                 architectureImage =  architecctureImageCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +architectureImageExtension;
               const architetureImagePath =  path.join(__dirname, '../../images/'+architectureImage)
               console.log("architectureImagepath", architetureImagePath)
               const buffer = Buffer.from(file.buffer, "utf-8");
               writeFileAsync(architetureImagePath, buffer);
         }
         if(file?.fieldname === "projectPdf"){
          let  brochureFileWithoutExtention = path.parse(file?.originalname).name
                console.log("brochureFileWithoutExtention", brochureFileWithoutExtention)
                const brochureExtension = path.extname(file.originalname);
                console.log("fileExtension", brochureExtension)
                 const brochurePdfCleanName = brochureFileWithoutExtention.replace(/\s/g, "_");
              projectPdf =  brochurePdfCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +brochureExtension;
             const pdfPath =  path.join(__dirname, '../../pdf/'+projectPdf)
             const buffer = Buffer.from(file.buffer, "utf-8");
             writeFileAsync(pdfPath, buffer);
         }

     });


  return new Promise(function (resolve, reject) {
    const subSqlQuery = `CALL procCreateProperty(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery,[Id, projectName, projectImage,
          architectureImage,  projectPdf, area,
           location, description, type, status, flatSize, floors], (err, result) => {
          closeConnection(connection);
          if (result) {
            const subSqlQuery = `CALL procStoreLocation(?, ?, ?, ?, ?)`;
            dbConn.getConnection((err, conn) => {
              if (err) {
                console.log("Database not connected !!", err);
              } else {
                conn.query(
                  subSqlQuery,
                  [
                    Id,
                    address,
                    city,
                    state,
                    pinCode
                  ],
                  (err, result) => {
                    closeConnection(conn);
                    if (err) {
                      console.log("err", err)
                      let result = false;
                      reject(result);
                    } else {
                      let result = true;
                      resolve(result);
                    }
                  }
                );
              }
            });

            console.log("resedentialResult", result)
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  });
};


const updateProject = async (request) => {
  let {project_id, projectName, area, address, city, state, pinCode, 
    location, description, type, status, flatSize, 
    floors, projectImage, architectureMap, projectPdf} = request?.body
    console.log("location",address, city, state, pinCode, location, project_id )
  const today = new Date()
  
  return new Promise(function (resolve, reject) {

      const sqlQuery = `CALL procCheckProjectIdExist(?)`
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database Connection Failed !!!", err);
        } else {
          connection.query(sqlQuery,[project_id], async (err, result) => {
            closeConnection(connection);
            console.log("Results", result)
              if(result[1][0].itemCount === 1){
              



                request?.files.forEach(async file => {
                  if(file?.fieldname === "projectImage"){
                     unlinkAsync(path.join(__dirname, '../../images/'+result[0][0].projectimage))
                    let  projectImageFileWithoutExtention = path.parse(file?.originalname).name
                    console.log("filenamewithoutExtension", projectImageFileWithoutExtention)
                    const projectImageExtension = path.extname(file.originalname);
                    console.log("fileExtension", projectImageExtension)
                     const projectImageCleanName = projectImageFileWithoutExtention.replace(/\s/g, "_");
                     projectImage =  projectImageCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +projectImageExtension;
                   const projectImagefilePath =  path.join(__dirname, '../../images/'+projectImage)
                   console.log("projectImagapath", projectImagefilePath)
                      const buffer = Buffer.from(file.buffer, "utf-8");
                    writeFileAsync(projectImagefilePath, buffer);
                  }
                   if(file?.fieldname === "architectureMap"){
                    if(result[0][0]?.architectureMap !== null){
                       unlinkAsync(path.join(__dirname, '../../images/'+result[0][0].architectureMap))
                    }
                    let  architectureImageFileWithoutExtention = path.parse(file?.originalname).name
                          console.log("architectureImageFileWithoutExtention", architectureImageFileWithoutExtention)
                          const architectureImageExtension = path.extname(file.originalname);
                          console.log("fileExtension", architectureImageExtension)
                           const architecctureImageCleanName = architectureImageFileWithoutExtention.replace(/\s/g, "_");
                           architectureMap =  architecctureImageCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +architectureImageExtension;
                         const architetureImagePath =  path.join(__dirname, '../../images/'+architectureMap)
                         console.log("architectureImagepath", architetureImagePath)
                         const buffer = Buffer.from(file.buffer, "utf-8");
                         writeFileAsync(architetureImagePath, buffer);
                   }
                   if(file?.fieldname === "projectPdf"){
                    if(result[0][0]?.projectPdf !== null){
                       unlinkAsync(path.join(__dirname, '../../pdf/'+result[0][0].projectPdf))
                    }
                    let  brochureFileWithoutExtention = path.parse(file?.originalname).name
                          console.log("brochureFileWithoutExtention", brochureFileWithoutExtention)
                          const brochureExtension = path.extname(file.originalname);
                          console.log("fileExtension", brochureExtension)
                           const brochurePdfCleanName = brochureFileWithoutExtention.replace(/\s/g, "_");
                        projectPdf =  brochurePdfCleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +brochureExtension;
                       const pdfPath =  path.join(__dirname, '../../pdf/'+projectPdf)
                       const buffer = Buffer.from(file.buffer, "utf-8");
                       writeFileAsync(pdfPath, buffer);
                   }
          
               });
          
            
                     try {
              const subSqlQuery = `CALL procUpdateProject(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
              dbConn.getConnection((err, connection) => {
                if (err) {
                  console.log("Database not connect !!", err);
                } else {
                  connection.query(
                      subSqlQuery, [ project_id,
                         projectName,
                         projectImage, 
                        architectureMap,
                        projectPdf,
                        area,
                        location,
                        description,
                        type,
                        status,
                        flatSize,
                        floors,
                        today,
                        city,
                        state,
                         address, 
                         pinCode

                      ],
                    (err, result1) => {
                      closeConnection(connection);
                      if (err) {
                        return reject(err);
                      }
                      let obj = {flag : true, message: "Project Updated Successfully"}
                      resolve(obj);
                    }
                  );
                }
              });
            } catch (error) {
              return reject(error);
            } 

              }else{
                  let obj = {flag : false , message: `Project Id ${project_id} does not Exist`}
                  resolve(obj);
              }
          })
      }
  })
               
          
        });
      }


const getProjectDetailsById = (request) => {
  return new Promise(function (resolve, reject) {
    let projectId = request.params.projectId;
    console.log("project", projectId)
    const subSqlQuery = `CALL procGetProjectDetailsById(?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery, [projectId], (err, result) => {
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


const getProjectBasicDetailsById = (request) => {
  return new Promise(function (resolve, reject) {
    let projectId = request.params.projectId;
    console.log("project", projectId)
    const subSqlQuery = `CALL procGetProjectBasicDetailsById(?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery, [projectId], (err, result) => {
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
const deleteProjectById = async (request) => {
  let {projectId, isActive} = request?.body
  console.log("isActive", isActive)
  const today = new Date()
  return new Promise(function (resolve, reject) {

      const sqlQuery = `CALL procCheckProjectIdExist(?)`
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database Connection Failed !!!", err);
        } else {
          connection.query(sqlQuery,[projectId], async (err, result) => {
            closeConnection(connection);
            console.log("Results", result)
           
              if(result[1][0].itemCount === 1){
                     try {
              const subSqlQuery = `CALL procDeleteProjectById(?, ?)`;
              dbConn.getConnection((err, connection) => {
                if (err) {
                  console.log("Database not connect !!", err);
                } else {
                  connection.query(
                      subSqlQuery,[projectId, isActive],
                    (err, result1) => {
                      closeConnection(connection);
                      if (err) {
                        return reject(err);
                      }
                      
                      let obj = {flag : true, message: "Project Deleted Successfully"}
                      resolve(obj);
                    }
                  );
                }
              });
            } catch (error) {
              return reject(error);
            } 
              }else{
                  let obj = {flag : false , message: `Project Id ${projectId} does not Exist`}
                  resolve(obj);
              }
          })
      }
  })
               
          
        });
      }

const getAllProjectDropDownList = async (request) => {
  return new Promise(function (resolve, reject) {
    const SqlQuery = `CALL porcGetAllProjectDropDown()`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(SqlQuery, (err, result) => {
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

const createProjectHighlights = (request) => {
  return new Promise(function (resolve, reject) {
      let {projectId, highlights} = request.body
    const subSqlQuery = `CALL procCreateProjectHighlights(?, ?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        console.log("Database not connected !!", err);
      } else {
        connection.query(subSqlQuery,[projectId, JSON.stringify(highlights)] ,(err, result) => {
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

const getAllProjectCountByStatus = async (request) => {
  const {status} = request?.params
  console.log("request", request?.params, status)
  return new Promise(function (resolve, reject) {
    const SqlQuery = `CALL procCountProject(?)`;
    dbConn.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(SqlQuery, [ status], (err, result) => {
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
  getCommercialProjectById,
  getResendtialProjectById,
  getAllCommercialProject,
  getAllResedentialProject,
  createProject,
  getAllProjectList,
  getProjectDetailsById,
  getAllProjectDropDownList,
  updateProject,
  deleteProjectById,
  createProjectHighlights,
  getProjectBasicDetailsById,
  getAllProjectCountByStatus
  
};
