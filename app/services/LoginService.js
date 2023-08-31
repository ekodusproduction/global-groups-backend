const LoginModel = require('../models/LoginModel')

const loginService = async (request) => {
  return new Promise((resolve, reject) => {
    LoginModel.adminLogin(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const createUserService = async (request) => {
    return new Promise((resolve, reject) => {
      LoginModel.createUser(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

module.exports = {
  loginService,
  createUserService
}
