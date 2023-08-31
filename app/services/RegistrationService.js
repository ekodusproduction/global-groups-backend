const RegistrationModel = require("../models/RegistrationModel")


const RegistrationServices = (request) =>{
    return new Promise((resolve, reject)=>{
        RegistrationModel.Registration(request).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        })
    })
}

const getEnquiryListServices = (request) =>{
    return new Promise((resolve, reject)=>{
        RegistrationModel.getEnquiryList(request).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        })
    })
}

module.exports = {
    RegistrationServices,
    getEnquiryListServices
}