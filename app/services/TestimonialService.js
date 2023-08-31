const TestimonialModel = require("../models/TestimonialModel")


const getTestimonialListService= async (request) => {
  return new Promise((resolve, reject) => {
    TestimonialModel.getTestimonyList(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const updateTestimonialService= async (request) => {
    return new Promise((resolve, reject) => {
      TestimonialModel.getTestimonialList(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }


  const deleteTestimonialService= async (request) => {
    return new Promise((resolve, reject) => {
      TestimonialModel.getTestimonialList(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const addTestimonialService= async (request) => {
    return new Promise((resolve, reject) => {
      TestimonialModel.addTestimony(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

module.exports = {
    getTestimonialListService,
    addTestimonialService,
    deleteTestimonialService,
    updateTestimonialService
}
