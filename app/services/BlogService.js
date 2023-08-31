const BlogModel = require("../models/BlogModel")

const BlogPostService = async (request) => {
  return new Promise((resolve, reject) => {
    BlogModel.postBlog(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getBlogPostListService = async (request) => {
  return new Promise((resolve, reject) => {
    BlogModel.getAllBlogPostList(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const getBlogPostByIdService = async (request) => {
  return new Promise((resolve, reject) => {
    BlogModel.getBlogDetailsById(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const updateBlogPostService = async (request) => {
  return new Promise((resolve, reject) => {
    BlogModel.postBlog(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const DeleteBlogPostService = async (request) => {
    return new Promise((resolve, reject) => {
      BlogModel.postBlog(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

module.exports = {
    BlogPostService,
    DeleteBlogPostService,
    updateBlogPostService,
    getBlogPostListService,
    getBlogPostByIdService
}