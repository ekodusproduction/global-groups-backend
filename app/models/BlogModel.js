const { closeConnection, dbConn } = require("../utils/database/SqlConnection");
const {titleToSlug} = require("../utils/common/CommonFunction")
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink)
const postBlog = async(request) => {
    return new Promise(function (resolve, reject) {
        let {title, summary, description, isPublished, posted_by } = request.body
        console.log("isPublished",  isPublished)
        console.log("isPublished", typeof isPublished)
        let flag = isPublished === "true" ? true: false
        let slug = titleToSlug(title)
        let Id = uuidv4()
 Id = Id.replace(/-/g, "");

 let blogImage = null;
 if(request.files?.blogImage){
  const blogImageFile = request?.files?.blogImage
   blogImage =  blogImageFile?.name   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +blogImageFile?.name.split(".")[1].trim();
  const projectImagefilePath =  path.join(__dirname, '../../images/'+blogImage)
   console.log("path", path.join(__dirname, '../../images/'+blogImage))
   blogImageFile.mv(projectImagefilePath)
}
      const subSqlQuery = `CALL procCreateBlog(?, ?, ?, ?, ?, ?, ?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database not connected !!", err);
        } else {
          connection.query(subSqlQuery,[Id, title, slug, blogImage, summary, JSON.stringify(description), isPublished, posted_by] ,async(err, result) => {
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
  const deleteBlogPost = (request) => {
    return new Promise(function (resolve, reject) {
        let {blogId } = request.params;
        
        const sqlQuery = `CALL procCheckBlogItemExist(?)`;
        dbConn.getConnection((err, connection) => {
          if (err) {
            console.log("Database Connection Failed !!!", err);
          } else {
            connection.query(sqlQuery,[blogId], async (err, result) => {
              closeConnection(connection);
              console.log("Result chek", result)
                if(result[0][0].itemCount === 1){
                  dbConn.getConnection((err, connection) => {
                    if (err) {
                      console.log("Database not connected !!", err);
                    } else {
                      const subSqlQuery = `CALL procDeleteBlog(?)`;
                      connection.query(subSqlQuery,[blogId] ,(err, result) => {
                        console.log("result", result)
                        closeConnection(connection);
                        if (result) {
                          let obj = {notFound: false, deleted: true,  message: `Blog Deleted Successfully for Id ${blogId}`}
                          resolve(obj);
                        } else {
                          reject(err);
                        }
                      });
                    }
                  });
                }else if(result[0][0].itemCount === 0){
                    let obj = { notFound: true, deleted: false, message: `No Blog Found with Id ${blogId} to Delete`}
                        resolve(obj)
                }
            })
        }
    })
     
     
    });
  };

  const updateBlogPostById = (request) => {
    const updatedDateTime = new Date()
    return new Promise(function (resolve, reject) {
        let {postId, title,  summary, description, isPublished, blogImage } = request.body
        let flag = isPublished === "true" ? true: false
        let slug = titleToSlug(title)
        
        const sqlQuery = `CALL procCheckBlogExist(?)`
        dbConn.getConnection((err, connection) => {
          if (err) {
            console.log("Database Connection Failed !!!", err);
          } else {
            connection.query(sqlQuery,[postId], async (err, result) => {
              closeConnection(connection);
              console.log("Results", result)
             
                if(result[0][0].itemCount === 1){
                       try {
                        if(request.files?.blogImage){
                          await unlinkAsync(path.join(__dirname, '/../utils/images/')+result[1][0].image_name)
                          const blogImageFile = request?.files?.blogImage
                          blogImage =  blogImageFile?.name   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +blogImageFile?.name.split(".")[1].trim();
                          const projectImagefilePath =  path.join(__dirname, '../../images/'+blogImage)
                           console.log("path", path.join(__dirname, '../../images/'+blogImage))
                           blogImageFile.mv(projectImagefilePath)
                        }
                        const subSqlQuery = `CALL procUpdateBlogPostById(?, ?, ?, ?, ?, ?, ?, ?)`;
                dbConn.getConnection((err, connection) => {
                  if (err) {
                    console.log("Database not connect !!", err);
                  } else {
                    connection.query(
                        subSqlQuery,[postId, title, slug, blogImage, summary, description, isPublished, updatedDateTime],
                      async(err, result1) => {
                        closeConnection(connection);
                        if (err) {
                          return reject(err);
                        }
                        
                      
                        let obj = {flag : true, message: "Blog Updated Successfully"}
                        resolve(obj);
                      }
                    );
                  }
                });
              } catch (error) {
                return reject(error);
              } 
                }else{
                    let obj = {flag : false}
                    resolve(obj);
                }

            })
        }
    })
    });
  };

  const getAllBlogPostList = async (request) => {
    let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
    let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procGetAllBlogPostList(?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(SqlQuery, [pageNumber,pageSize ], (err, result) => {
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

  const getAllBlogPostListAdmin = async (request) => {
    let pageNumber =  request.params.pageNumber ? parseInt(request.params.pageNumber) : 1;;
    let pageSize = request.params.pageSize ? parseInt(request.params?.pageSize): 10
    return new Promise(function (resolve, reject) {
      const SqlQuery = `CALL procGetAllBlogPostListForAdmin(?, ?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(SqlQuery, [pageNumber,pageSize ], (err, result) => {
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



  const getBlogDetailsById = (request) => {
    return new Promise(function (resolve, reject) {
      let blogId = request.params.blogId;
      console.log("project", blogId)
      const subSqlQuery = `CALL procGetBlogDetailsById(?)`;
      dbConn.getConnection((err, connection) => {
        if (err) {
          console.log("Database not connected !!", err);
        } else {
          connection.query(subSqlQuery, [blogId], (err, result) => {
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
    postBlog,
    deleteBlogPost,
    updateBlogPostById,
    getAllBlogPostList, 
    getBlogDetailsById,
    getAllBlogPostListAdmin
  }