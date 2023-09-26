const TestimonyService = require("../services/TestimonialService")
const StatusCode = require("../utils/common/Constant")
const {testimonialValidation, deleteTestimonyValidation} = require("../utils/common/validations/testimonialValidation")
const EventEmitter = require("../utils/common/EventEmitter")
const fs = require('fs')
const path = require("path")
const {validateAndProcessFile} = require("../utils/common/CommonFunction")




const addTestimony = (request, response) =>{
    console.log("request", request.body)
    let apiName = "postBlog";
    const {error} = testimonialValidation(request.body)
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("addTestimony", [
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
    }else {
        if(!request.files || Object.keys(request.files).length === 0){
            commonAddTestimonial(request, response, apiName)
        }else{
            let imageError = validateAndProcessFile(request.files?.image);
            if(imageError?.length > 0){
                EventEmitter.errorEmitter("addTestimony", [
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
            }

            commonAddTestimonial(request, response, apiName)
        }

      
    }
}


const commonAddTestimonial = async(request, response, apiName)=>{
    return new Promise(function () {
        TestimonyService.addTestimonialService(request).then((result) => {
            console.log("result", result)
            EventEmitter.auditEmitter("addTestimony", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                "add",
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
        EventEmitter.errorEmitter("addTestimony", [
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

const deleteTestimony = async(request, response) =>{
    console.log("data",request.body)
    const {error} = deleteTestimonyValidation(request.params)
    let apiName = "deleteTestimony";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("deleteTestimony", [
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
            TestimonyService.deleteTestimonialService(request).then((result) => {
                console.log("result", result)
                if(result?.notFound){
                    EventEmitter.auditEmitter("deleteTestimony", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "delete",
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.DATA_NOT_FOUND,
                        data: {
                            result: StatusCode.successMessage.FAIL,
                            message: result?.message,
                        },
                    });
                }else if(!result?.notFound && result?.deleted){
                    EventEmitter.auditEmitter("deleteTestimony", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "delete",
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.SUCCESS,
                        data: {
                            result: StatusCode.successMessage.SUCCESSFULL,
                            message: result?.message,
                        },
                    });
                }
               
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("deleteTestimony", [
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


const updateTestimony = async(request, response) =>{
    console.log("data",request.body)
    const {error} = galleryItemUpdateValidation(request.body)
    console.log("errors", error)
    let apiName = "updateTestimony";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("updateTestimony", [
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
            TestimonyService.updateTestimonialService(request).then((result) => {
              console.log("updateTestimony", result)
                if(!result?.flag){
                    EventEmitter.errorEmitter("updateTestimony", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.INVALID_IMAGE_ID,
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);
                    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                        status: StatusCode.statusCode.BAD_REQUEST,
                        data: {
                            message: StatusCode.errorMessage.DATA_NOT_FOUND,
                            result: StatusCode.errorMessage.INVALID_IMAGE_ID,
                        },
                    });
                }
                EventEmitter.auditEmitter("updateTestimony", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.SUCCESSFULL,
                        result: result?.message,
                    },
                });
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("updateTestimony", [
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

const getAllTestimonyList = async(request, response) =>{
   let apiName = "getAllTestimonyList"
        return new Promise(function () {
            TestimonyService.getTestimonialListService(request).then((result) => {
              console.log("getAllTestimonyList", result)
              console.log("length", result[0].length)
                if(result[0].length === 0){
                    EventEmitter.errorEmitter("getAllTestimonyList", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.EMPTY_GALLERY,
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                        status: StatusCode.statusCode.SUCCESS,
                        data: {
                            message: StatusCode.errorMessage.EMPTY_GALLERY,
                            result: StatusCode.errorMessage.SUCCESS,
                        },
                    });
                } else if(result[0].length > 0){
                 result[0]?.forEach(element => {
                    return element[`filePath`] = `uploads/`+element?.image;
                        
                    });

                    EventEmitter.auditEmitter("getAllTestimonyList", [
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
            EventEmitter.errorEmitter("getAllTestimonyList", [
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
    addTestimony,
   deleteTestimony,
   updateTestimony,
   getAllTestimonyList

}