const Authorized = require("../utils/authentication/CheckAuth");
const AppAuth = require("../utils/authentication/AppAuth");
const Express = require("express");
const Router = Express.Router();
const GalleryController = require("../controllers/GalleryController")
const {fileUploads} = require("../utils/middlewares/uploadMiddleware")




/**
 * Date: 17-08-2023
 * Author:Dinesh
 * Description: Gallery
 */





Router.post("/gallery/uploadGallery", (response, request) => {
    GalleryController.uploadGallery(response, request);
});








Router.post("/update/gallery", fileUploads.single('upFile'), (response, request) => {
    GalleryController.updateGalleryItem(response, request);
});


Router.get("/gallery/getGalleryList/:projectId", (response, request) => {
    GalleryController.getAllGalleryItemsByProjectId(response, request);
});


Router.delete("/gallery/deleteGalleryItem/:galleryItemId",  async(response, request) => {
    GalleryController.deleteGalleryItem(response, request);
   
});

Router.get("/gallery/getGalleryList", (response, request) => {
    GalleryController.getAllGalleryItems(response, request);
});




module.exports = Router;