const jwt = require('jsonwebtoken')
const Log = require('../logger/logger').log

module.exports = (request, response, next) => {
  try {
    let token = request.headers.authorization.split(' ')[1]
    console.log("token", token)
    token= token+"ddddd";
    console.log("token", token)
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)
    request.userData = decoded
    next()
  } catch (error) {
    // Log.error(
    //   '{ middleware: Authorization, type: Exception, status: 401, error: ' +
    //             error +
    //             ' }'
    // )
    response
      .status(401)
      .send({ status: 401, message: 'Unauthorized token' })
  }
}
