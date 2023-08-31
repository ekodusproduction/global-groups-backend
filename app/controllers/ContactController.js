const EventEmitter = require("../utils/common/EventEmitter");
const StatusCode = require("../utils/common/constant");
const {contactValidation}  = require("../utils/common/validations/contactvalidation")
const ContactService = require("../services/ContactService")
const Conatact = (request, response) =>{
    let apiName = "contact";
    const { error } = contactValidation(request.body);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("contact", [
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
            ContactService.contactServices(request).then((result) => {
                console.log("result", result)
                if(result){
                    EventEmitter.auditEmitter("contact", [
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


const getContactList = (request, response) =>{
    let apiName = "contactList";
    
        return new Promise(function () {
            ContactService.getContactListService(request).then((result) => {
                console.log("contactList", result[0])
                if(result[0].length === 0){
                    EventEmitter.auditEmitter("contactList", [
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
                    EventEmitter.auditEmitter("contactList", [
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
            EventEmitter.errorEmitter("contactList", [
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


module.exports = {
    Conatact,
    getContactList
}
