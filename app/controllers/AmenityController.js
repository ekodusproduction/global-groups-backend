const AmenityService = require("../services/AmenityService")
const StatusCode = require("../utils/common/constant")
const {amenityValidation, addAmenityValidation, getAmenityValidation} = require("../utils/common/validations/amenityValidation")
const EventEmitter = require("../utils/common/EventEmitter")
const {validateAndProcessFile} = require("../utils/common/CommonFunction")

const createAminity = async(request, response) =>{
    const {error} = amenityValidation(request.body)
    let apiName = "createAminity";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("createAminity", [
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
    }
   else{
    if(!request.files || Object.keys(request.files).length === 0){
        EventEmitter.errorEmitter("createAminity", [
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
 else if(!request.files?.image){
    EventEmitter.errorEmitter("createAminity", [
        apiName,
        StatusCode.apiVersion.VERSION1 + request.route.path,
        StatusCode.errorMessage.PROJECT_PDF_REQUIRED,
        StatusCode.statusCode.BAD_REQUEST,
    ]);
    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
        status: StatusCode.statusCode.BAD_REQUEST,
        data: {
            message: StatusCode.errorMessage.PROJECT_PDF_REQUIRED,
           
        },
    });
   }else{
    
    let imageError = validateAndProcessFile(request.files?.image);
    
    console.log("error",  imageError)
        if(imageError.length > 0 || imageError?.length > 0 || imageError?.length > 0){
            console.log("Dinesh Enters herer")
            EventEmitter.errorEmitter("createProject", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                projecImageError,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: imageError,
                   
                },
            });
        }else{
            
                return new Promise(function () {
                    AmenityService.createAmenityService(request).then((result) => {
                      console.log("result", result)
                      if(result){
                        EventEmitter.auditEmitter("createAminity", [
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
                        EventEmitter.auditEmitter("createAminity", [
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
                  EventEmitter.errorEmitter("createAminity", [
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


const addAminity = async(request, response) =>{
    console.log("request", request.body)
    const {error} = addAmenityValidation(request.body)
    let apiName = "addAminity";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("addAminity", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
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
    }
   else{
   
                return new Promise(function () {
                    AmenityService.addAmenityService(request).then((result) => {
                      console.log("result", result)
                      if(result){
                        EventEmitter.auditEmitter("addAminity", [
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
                        EventEmitter.auditEmitter("addAminity", [
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
                  EventEmitter.errorEmitter("addAminity", [
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
const getAllAmenity = async(request, response) =>{
    let apiName = "getAllAmenity"
    return new Promise(function () {
        AmenityService.getAllAmenityService(request).then((result) => {
            console.log("result", result)
          
            EventEmitter.auditEmitter("getAllAmenity", [
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
        EventEmitter.errorEmitter("getAllAmenity", [
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

const getAllAmenitiesByProjectId = async(request, response) =>{
    let apiName = "getAllAmenitiesByProjectId"
    const {error} = getAmenityValidation(request.params)
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("createAminity", [
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
            AmenityService.getAllAmenitiesByProjectIdService(request).then((result) => {
                console.log("getAllAmenityResult", result[0])
              if(result[0][0]?.length > 0){
                EventEmitter.auditEmitter("getAllAmenitiesByProjectId", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.SUCCESSFULL,
                        result: result[0]?.amenities,
                    },
                });
              }else{
                EventEmitter.auditEmitter("getAllAmenitiesByProjectId", [
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
            EventEmitter.errorEmitter("getAllAmenitiesByProjectId", [
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
module.exports = {
    createAminity,
    addAminity,
    getAllAmenity,
    getAllAmenitiesByProjectId
}