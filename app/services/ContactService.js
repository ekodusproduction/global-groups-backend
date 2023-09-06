const ContactModel = require("../models/ContactModel")

const contactServices = async (request) => {
  return new Promise((resolve, reject) => {
    ContactModel.submitContact(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getContactListService = async (request) => {
    return new Promise((resolve, reject) => {
      ContactModel.getContactList(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  

  const getEnquiryCountService = async (request) => {
    return new Promise((resolve, reject) => {
      ContactModel.getAllEnquiryCount(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

module.exports = {
    contactServices,
    getContactListService,
    getEnquiryCountService
}
