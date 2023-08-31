
const notFound = (app) => {
  app.use((request,response) => {
    const error = new Error('Not found')
    error.status = 404
    response
    .status(error.status || 500)
    .send({ status: error.status || 500, message: error.message })

  })
}

module.exports = notFound
