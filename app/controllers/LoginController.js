const LoginService = require("../services/LoginService");
const StatusCode = require("../utils/common/constant");
const EventEmitter = require("../utils/common/EventEmitter");
const { loginValidation} = require("../utils/common/validations/signupValidation")
/**
 * Date: 18-08-2023
 * Author: Dinesh
 */

const adminLogin = async (request, response) => {
    const { error } = loginValidation(request.body);
    let apiName = "login";
    if (error) {
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("login", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }

    } else {
        return new Promise(function () {
            LoginService.loginService(request).then((result) => {
                if (!result?.emailExist) {
                    EventEmitter.errorEmitter("login", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.INVALID_EMAIL_ID,
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);
                    return response
                        .status(StatusCode.statusCode.DATA_NOT_FOUND)
                        .send({
                            status: StatusCode.statusCode.DATA_NOT_FOUND,
                            data: {
                                message:
                                    StatusCode.errorMessage
                                        .INVALID_EMAIL_ID,
                            },
                        });
                } else if ( result?.emailExist && !result?.validPassword  ) {
                    EventEmitter.errorEmitter("login", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.INVALID_USER_CRENDENTIAL,
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);
                    return response
                        .status(StatusCode.statusCode.DATA_NOT_FOUND)
                        .send({
                            status: StatusCode.statusCode.DATA_NOT_FOUND,
                            data: {
                                message:
                                    StatusCode.errorMessage.INVALID_USER_CRENDENTIAL,
                            },
                        });
                }  else if (result?.emailExist && result?.validPassword ) {
                    EventEmitter.errorEmitter("login", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.LOGIN_SUCCESSFULL,
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response
                        .status(StatusCode.statusCode.SUCCESS)
                        .send({
                            status: StatusCode.statusCode.SUCCESS,
                            data: {
                                message:
                                    StatusCode.errorMessage
                                        .LOGIN_SUCCESSFULL,
                                        result
                            },
                        });
                }
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("login", [
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
  
};


const createUser = async (request, response) => {
    const { error } = loginValidation(request.body);
    let apiName = "createuser";
    if (error) {
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("createuser", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    } else {
        return new Promise(function () {
            LoginService.createUserService(request).then((result) => {
                if (result === 1) {
                    EventEmitter.errorEmitter("createuser", [
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
                } else if(result === 2){
                    EventEmitter.errorEmitter("createuser", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.successMessage.USER_CREATED_SUCCESSFULLY,
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response
                        .status(StatusCode.statusCode.SUCCESS)
                        .send({
                            status: StatusCode.statusCode.SUCCESS,
                            data: {
                                message:
                                    StatusCode.successMessage
                                        .USER_CREATED_SUCCESSFULLY,
                            },
                        });
                }
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("createuser", [
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
  
};
module.exports = {
    adminLogin,
    createUser
};
