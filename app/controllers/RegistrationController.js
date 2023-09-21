const EventEmitter = require("../utils/common/EventEmitter")
const StatusCode = require("../utils/common/Constant")
const RegistrationService = require("../services/RegistrationService")
const constant = require("../utils/common/Constant")
const {RegistrationValidation} = require("../utils/common/validations/signupValidation")

const Registration = (request, response) =>{
    console.log("registration called")
    let apiName = "registration";
    console.log("regisration", request)
    const { error } = RegistrationValidation(request.body);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("registration", [
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
            RegistrationService.RegistrationServices(request).then((result) => {
                console.log("Dinsh", result)
                if (result == constant.emailcount.EXIST) {
                    console.log("duplicate")
                    EventEmitter.errorEmitter("registration", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.EMAIL_ID_ALREADY_EXISTS,
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);

                    return response
                        .status(StatusCode.statusCode.BAD_REQUEST)
                        .send({
                            status: StatusCode.statusCode.BAD_REQUEST,
                            data: {
                                message:
                                    StatusCode.errorMessage
                                        .EMAIL_ID_ALREADY_EXISTS,
                            },
                        });
                } else {
                  
                    EventEmitter.auditEmitter("registration", [
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
                                    .RESIGTRATION_SUBMITTED_SUCCESSFULLY,
                        },
                    });
                }
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("registration", [
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

const getAllEnquiryList = (request, response) =>{
    
    let apiName = "getAllEnquiryList";
    console.log("getAllEnquiryList", request)
    return new Promise(function () {
        RegistrationService.getEnquiryListServices(request).then((result) => {
            console.log("getAllEnquiryList", result[0])
            if(result[0].length === 0){
                EventEmitter.auditEmitter("getAllEnquiryList", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "List",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message:
                            StatusCode.successMessage
                                .DATA_NOT_FOUND,
                                result: result[0]
                    },
                });
            }else{
                EventEmitter.auditEmitter("getAllEnquiryList", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "List",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message:
                            StatusCode.successMessage
                                .SUCCESS,
                                result: result[0]
                    },
                });
            }   
            
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getAllEnquiryList", [
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

const getAllOutReachCount = async(request, response)=>{
    let apiName = "getAllOutReachCount"
    return new Promise(function () {
        RegistrationService.getOutReachCountServices(request).then((result) => {
            console.log("result", result)
          if(result.length === 0){
            EventEmitter.auditEmitter("getAllOutReachCount", [
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
            EventEmitter.auditEmitter("getAllOutReachCount", [
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
        EventEmitter.errorEmitter("getAllOutReachCount", [
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
    Registration,
    getAllEnquiryList,
    getAllOutReachCount
}