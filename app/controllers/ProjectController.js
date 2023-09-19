const ProjectService = require("../services/ProjectService")
const StatusCode = require("../utils/common/Constant")
const {createProjectValidation, updateProjectValidation, getProjectDetialsValidation, deleteProjectValidation, projectHighlightsValidataion} = require("../utils/common/validations/propertyValidation")
const EventEmitter = require("../utils/common/EventEmitter")
const {validateAndProcessFile} = require("../utils/common/CommonFunction")
const fs = require('fs')
const path = require('path')
const createProject = async(request, response) =>{
    const {error} = createProjectValidation(request.body)
    let apiName = "createProject";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("createProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    result: StatusCode.successMessage.FAIL,
                    message: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    }
   else{
    if(!request.files || Object.keys(request.files).length === 0){
        EventEmitter.errorEmitter("createProject", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            StatusCode.errorMessage.IMAGE_FILE_REQUIRED,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: {
                message: StatusCode.errorMessage.IMAGE_FILE_REQUIRED,
               
            },
        });
    }
   else if(!request.files?.projectImage){
    EventEmitter.errorEmitter("createProject", [
        apiName,
        StatusCode.apiVersion.VERSION1 + request.route.path,
        StatusCode.errorMessage.PROJECT_IMAGE_FILE_REQUIRED,
        StatusCode.statusCode.BAD_REQUEST,
    ]);
    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        status: StatusCode.statusCode.BAD_REQUEST,
        data: {
            message: StatusCode.errorMessage.PROJECT_IMAGE_FILE_REQUIRED,
           
        },
    });
   }else{
  
            let projecImageError = []
            let projectPdfImageError = []
             let architectureMapImageError = [];
        
            if(request.files?.projectImage){
                projecImageError = validateAndProcessFile(request.files?.projectImage);
            }
            if(request.files?.architectureMap){
                architectureMapImageError = validateAndProcessFile(request.files?.architectureMap);
            }
            if(request.files?.projectPdf){
                projectPdfImageError = validateAndProcessFile(request.files?.projectPdf, [".pdf", 25]);
            }
           let errors = projecImageError.concat(architectureMapImageError, projectPdfImageError)
   
           
   if(errors?.length > 0){
       EventEmitter.errorEmitter("createProject", [
           apiName,
           StatusCode.apiVersion.VERSION1 + request.route.path,
           errors,
           StatusCode.statusCode.BAD_REQUEST,
       ]);
       return response.status(StatusCode.statusCode.BAD_REQUEST).send({
           status: StatusCode.statusCode.BAD_REQUEST,
           data: {
               message: errors,
              
           },
       });
   }else{
    console.log("Dinesh")
    return new Promise(function () {
        ProjectService.createProjectServices(request).then((result) => {
            console.log("result", result)
            if(result){
              EventEmitter.auditEmitter("createProject", [
                  apiName,
                  StatusCode.apiVersion.VERSION1 + request.route.path,
                  "list",
                  StatusCode.statusCode.SUCCESS,
              ]);
              return response.status(StatusCode.statusCode.SUCCESS).send({
                  status: StatusCode.statusCode.SUCCESS,
                  data: {
                      message: StatusCode.successMessage.SUCCESSFULL,
                      result: result,
                  },
              });
            }else if(!result){
              EventEmitter.auditEmitter("createProject", [
                  apiName,
                  StatusCode.apiVersion.VERSION1 + request.route.path,
                 "INTERNAL SERVER ERROR",
                  StatusCode.statusCode.INTERNAL_SERVER_ERROR,
              ]);
              return response.status(StatusCode.statusCode.SUCCESS).send({
                  status: StatusCode.statusCode.INTERNAL_SERVER_ERROR,
                  data: {
                      message: StatusCode.successMessage.INTERNAL_SERVER_ERROR,
                     
                  },
              });
            }
           
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("createProject", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
   }
 
   }
     
      
    }
}
const commonUpdateLogic = async(request, response, apiName) =>{
    return new Promise(function () {
        ProjectService.updateProjectServices(request).then((result) => {
            console.log("result", result)
            EventEmitter.auditEmitter("updateProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.successMessage.SUCCESSFULL,
                    result: result,
                },
            });
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("updateProject", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
     
}
const updateProject = async(request, response) =>{
    const {error} = updateProjectValidation(request.body)
    let apiName = "updateProject";
    console.log("inside update")
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("updateProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    result: StatusCode.successMessage.FAIL,
                    message: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    }
   else{
    if(!request.files || Object.keys(request.files).length === 0){
        commonUpdateLogic(request, response, apiName)
    }
    else{
     
            console.log("enters hererere 1 Dinesh")
            let projecImageError = []
            let projectPdfImageError = []
             let architectureMapImageError = [];
        
            if(request.files?.projectImage){
                projecImageError = validateAndProcessFile(request.files?.projectImage);
            }
            if(request.files?.architectureMap){
                architectureMapImageError = validateAndProcessFile(request.files?.architectureMap);
            }
            if(request.files?.projectPdf){
                projectPdfImageError = validateAndProcessFile(request.files?.projectPdf, [".pdf", 25]);
            }
           let errors = projecImageError.concat(architectureMapImageError, projectPdfImageError)
           
            if(errors?.length > 0){
                EventEmitter.errorEmitter("createProject", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    errors,
                    StatusCode.statusCode.BAD_REQUEST,
                ]);
                return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                    status: StatusCode.statusCode.BAD_REQUEST,
                    data: {
                        message: errors,
                       
                    },
                });
            }else{
                commonUpdateLogic(request, response, apiName)
            }
          
           
    }
      }
}
const getAllProject = async(request, response) =>{
    let apiName = "getAllProject"
    return new Promise(function () {
        ProjectService.getAllProjectServices(request).then((result) => {
            console.log("result", result)
          
            EventEmitter.auditEmitter("getAllProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.successMessage.SUCCESSFULL,
                    result: result,
                },
            });
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getAllProject", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
}

const getAllResedentialProject = async(request, response) =>{
    let apiName = "getAllResedentialProject"
    return new Promise(function () {
        ProjectService.getAllResedentialProjectServices(request).then((result) => {
            console.log("result", result)
          
            EventEmitter.auditEmitter("getAllResedentialProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.successMessage.SUCCESSFULL,
                    result: result[0],
                },
            });
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getAllResedentialProject", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
}

const getAllCommercialProject = async(request, response) =>{
    let apiName = "getAllCommercialProject"
    return new Promise(function () {
        ProjectService.getAllCommercialProjectServices(request).then((result) => {
            console.log("result", result)
          
            EventEmitter.auditEmitter("getAllCommercialProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.successMessage.SUCCESSFULL,
                    result: result[0],
                },
            });
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getAllCommercialProject", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
}


const getAllProjectDropDownList = async(request, response)=>{
    let apiName = "getAllProjectDropDownList"
    return new Promise(function () {
        ProjectService.getAllProjectDropDownService(request).then((result) => {
            console.log("result", result)
          if(result.length === 0){
            EventEmitter.auditEmitter("getAllProjectDropDownList", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.errorMessage.DATA_NOT_FOUND,
                    result: result,
                },
            });
          }
            EventEmitter.auditEmitter("getAllProjectDropDownList", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.successMessage.SUCCESSFULL,
                    result: result,
                },
            });
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getAllProjectDropDownList", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
}


const getProjectDetailsById = async(request, response) =>{
    let apiName = "getProjectDetailsById"
    const {error} = getProjectDetialsValidation(request.params)

    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("updateProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: StatusCode.successMessage.FAIL,
                    result: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    }else{
        return new Promise(function () {
            ProjectService.getProjectDetailsByIdServices(request).then((result) => {
                console.log("result", result)
              console.log("result", result[0][0])
              if(result[0].length === 0){
                EventEmitter.auditEmitter("getProjectDetailsById", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.DATA_NOT_FOUND,
                    data: {
                        message: StatusCode.errorMessage.NO_PROJECT_DETAILS,
                       
                    },
                });
              }else{
                EventEmitter.auditEmitter("getProjectDetailsById", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.SUCCESSFULL,
                        result: result[0][0],
                    },
                });
              }
               
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("getProjectDetailsById", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err.message,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err.message },
            });
        });
    }
}

const getProjectBasicDetailsById = async(request, response) =>{
    let apiName = "getProjectBasicDetailsById"
    const {error} = getProjectDetialsValidation(request.params)

    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("getProjectBasicDetailsById", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: StatusCode.successMessage.FAIL,
                    result: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    }else{
        return new Promise(function () {
            ProjectService.getProjectBasicDetailsByIdServices(request).then((result) => {
                console.log("result", result)
              console.log("result", result[0])
              if(result[0].length === 0){
                EventEmitter.auditEmitter("getProjectBasicDetailsById", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.DATA_NOT_FOUND,
                    data: {
                        message: StatusCode.errorMessage.NO_PROJECT_DETAILS,
                       
                    },
                });
              }else{
                EventEmitter.auditEmitter("getProjectBasicDetailsById", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.SUCCESSFULL,
                        result: result[0],
                    },
                });
              }
               
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("getProjectDetailsById", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err.message,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err.message },
            });
        });
    }
}


const deleteProject = async(request, response) =>{
   
    let apiName = "deleteProject"
    const {error} = deleteProjectValidation(request.body)

    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("deleteProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: StatusCode.successMessage.FAIL,
                    result: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    }else{
        return new Promise(function () {
            ProjectService.deleteProjectService(request).then((result) => {
                console.log("result", result)
             
              if(!result?.flag){
                EventEmitter.auditEmitter("deleteProject", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    StatusCode.errorMessage.NO_PROJECT_TO_DELETE,
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.errorMessage.NO_PROJECT_TO_DELETE,
                        
                    },
                });
              }else{
                EventEmitter.auditEmitter("deleteProject", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.DELETED_SUCCESSFULLY,
                        
                    },
                });
              }
               
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("deleteProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err.message,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err.message },
            });
        });
    }
}


const downloadProjectBrochure = async(request, response) =>{
    const fileName = request?.params?.fileName;
    console.log("filename", JSON.stringify(fileName))
   const downloadPath = path.join(__dirname, '../../pdf/'+fileName);
    const file = fs.createReadStream(downloadPath)
    response.setHeader('Content-Type', 'application/pdf');
   response.download(file)
    
}
const createHighlights = (request, response) =>{
    let apiName = "createHighlights";
    const { error } = projectHighlightsValidataion(request.body);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("createHighlights", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    result: StatusCode.successMessage.FAIL,
                    message: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    } else {
        return new Promise(function () {
            ProjectService.createProjectHiglightServices(request).then((result) => {
                console.log("result", result)
                if(result){
                    EventEmitter.auditEmitter("createHighlights", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "Add",
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.SUCCESS,
                        data: {
                            message:
                                StatusCode.successMessage
                                    .CONTACT_SENT_SUCCESSFULLY,
                        },
                    });
                }else{

                }
                  
                   
                
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("contact", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err,
                StatusCode.statusCode.BAD_REQUEST,
            ]);

            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err },
            });
        });
    }
}



const getAllProjectCountByStatus = async(request, response)=>{
    let apiName = "getAllProjectCountByStatus"
    return new Promise(function () {
        ProjectService.getAllProjectCountByStatusService(request).then((result) => {
            console.log("result", result)
          if(result.length === 0){
            EventEmitter.auditEmitter("getAllProjectCountByStatus", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.errorMessage.DATA_NOT_FOUND,
                    result: result,
                },
            });
          }
            EventEmitter.auditEmitter("getAllProjectDropDownList", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "list",
                StatusCode.statusCode.SUCCESS,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.SUCCESS,
                data: {
                    message: StatusCode.successMessage.SUCCESSFULL,
                    result: result,
                },
            });
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getAllProjectCountByStatus", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
}

module.exports = {
    createProject,
    updateProject,
    getAllProject,
    getAllProjectDropDownList,
    getProjectDetailsById,
    deleteProject, 
    getAllResedentialProject,
    getAllCommercialProject,
    createHighlights,
    getProjectBasicDetailsById,
    downloadProjectBrochure,
    getAllProjectCountByStatus
}