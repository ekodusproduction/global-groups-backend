const PropertyController = require("../controllers/ProjectController")
const Authorized = require("../utils/authentication/CheckAuth");
const Express = require("express");
const AppAuth = require("../utils/authentication/AppAuth");
const Router = Express.Router();
const multer = require("multer");
const path = require('path');
const EventEmitter = require("../utils/common/EventEmitter");
const StatusCode = require("../utils/common/Constant");
const CheckAuth = require("../utils/authentication/CheckAuth");



const fileUploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
console.log("file", file)
        if (file.fieldname === 'projectImage' || file.fieldname === 'architectureMap') {
            cb(null, path.join(__dirname, '../../images'));
          } else if (file.fieldname === 'projectPdf') {
            cb(null, path.join(__dirname, '../../pdf'));
          }
    },
    filename: (req, file, cb) => {
     cb(
      null,
        file.originalname  
        .split(".")[0]
             .trim()
         .replace(" ", "_") 
       +
        "-" +
         Date.now() +
        "." 
       +
       file.originalname.split(".")[1].trim()
       //  path.extname(file.originalname)
      );
     },
   });
   const imageFilter = function(req, file, cb) {
    console.log("file", file)
    if(!file){
        req.fileValidationError = 'No file has been Uploaded!';
        return cb(new Error('No file has been Uploaded!'), false);
        cb(null, true);
    }
   else if(file.fieldname === 'projectImage' || file.fieldname === 'architectureMap'){
 // Accept images only
 if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
}
cb(null, true);
    }else if(file.fieldname === 'projectPdf'){
        if (!file.originalname.match(/\.(pdf)$/)) {
            req.fileValidationError = 'Only PDF files are allowed!';
            return cb(new Error('Only PDF files are allowed!'), false);
        }
        cb(null, true);
    }
   
  };
   const fileUploads = multer({
     storage: fileUploadStorage,
    fileFilter: imageFilter,
     onError: function (error, next) {
        console.log("error", error)
       next(error); 
    },
   }).fields([{name: 'projectImage', maxCount:1},{name: 'architectureMap', maxCount:1}
   ,{name: 'projectPdf', maxCount:1},])
 


/**
 * @swagger
 * /v1/api/project/commercial:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get Commercial Property list
 *     description: List of Commercial Property
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */

Router.get("/project/commercial",  (response, request) => {
    PropertyController.getAllCommercialProject(response, request);
});


/**
 * @swagger
 * /v1/api/project/resedential:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get Resedential Property list
 *     description: List of Commercial Property
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */

Router.get("/project/resedential",  (response, request) => {
    PropertyController.getAllResedentialProject(response, request);
});


/**
 * @swagger
 * /v1/api/project/commercial{propertyId}:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get Commercial Property list By ID
 *     description: Details of the Commercial Property By ID
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
 *     parameters:
 *       - name: propertyId
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */

Router.get("/project/commercial/:propertyId", (response, request) => {
    PropertyController.getCommercialProjectById(response, request);
});


Router.get("/project/getAllProject", AppAuth, CheckAuth, (response, request) => {
   
    console.log("appToken", request.getHeader('apptoken'))

    PropertyController.getAllProject(response, request);
});

Router.get("/project/getAllProjectDropDownList", (response, request) => {
    PropertyController.getAllProjectDropDownList(response, request);
});

Router.get("/project/getProjectById/:projectId", (response, request) => {
    PropertyController.getProjectDetailsById(response, request);
});

Router.get("/project/getProjectBasicById/:projectId",  (response, request) => {
    PropertyController.getProjectBasicDetailsById(response, request);
});

Router.post("/project/addProject", (response, request) => {
    
    PropertyController.createProject(response, request);
    
});


Router.post("/project/addhighlights", (response, request) => {
    
    PropertyController.createHighlights(response, request);
    
});


Router.put("/project/updateProject", (response, request) => { 
    PropertyController.updateProject(response, request);
    
});

Router.delete("/project/deleteProject", (response, request) => {
      PropertyController.deleteProject(response, request);
    
});

Router.get("/project/downloadBrochure/:fileName", (response, request) => {
    PropertyController.downloadProjectBrochure(response, request);
  
});
Router.get("/project/projectCount/:status", (response, request) => {
    PropertyController.getAllProjectCountByStatus(response, request);
  
});


module.exports = Router;
