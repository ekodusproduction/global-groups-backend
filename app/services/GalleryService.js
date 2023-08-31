const GalleryModel = require("../models/GalleryModel")


const getAllGalleryListService = async (request) => {
  return new Promise((resolve, reject) => {
    GalleryModel.getAllGalleryList(request)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const getAllGalleryListServiceById = async (request) => {
    return new Promise((resolve, reject) => {
      GalleryModel.getAllGalleryList(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

const uploadGalleryService = async (request) => {
    return new Promise((resolve, reject) => {
      GalleryModel.uploadGallery(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const deleteGalleryItemService = async (request) => {
    return new Promise((resolve, reject) => {
      GalleryModel.deleteGalleryItemById(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }


  const updateGalleryItemService = async (request) => {
    return new Promise((resolve, reject) => {
      GalleryModel.updateGalleryItemById(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }


  const getGalleryItemByProjectIdService = async (request) => {
    return new Promise((resolve, reject) => {
      GalleryModel.getAllGalleryListByProjectId(request)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }



module.exports = {
    getAllGalleryListService,
    getAllGalleryListServiceById,
    uploadGalleryService,
    deleteGalleryItemService,
    updateGalleryItemService,
    getGalleryItemByProjectIdService
 
}
