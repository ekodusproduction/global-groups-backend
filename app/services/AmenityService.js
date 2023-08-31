const AmenityModel = require("../models/AmenityModel")
const createAmenityService = async (request) => {
  return new Promise((resolve, reject) => {
    AmenityModel.createAmenity(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const addAmenityService = async (request) => {
    return new Promise((resolve, reject) => {
      AmenityModel.addAmenity(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  const getAllAmenityService = async (request) => {
    return new Promise((resolve, reject) => {
      AmenityModel.getAllAmenityList(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const getAllAmenitiesByProjectIdService = async (request) => {
    return new Promise((resolve, reject) => {
      AmenityModel.getAmenitiesByProjectId(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

module.exports = {
    createAmenityService,
    addAmenityService,
    getAllAmenityService,
    getAllAmenitiesByProjectIdService
}