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


/**
 * @swagger
 * /v1/api/gallery:
 *   post:
 *     tags:
 *       - Gallery
 *     summary: Get gallery List
 *     description: List of gallery based on property type
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
 *     consumes:
 *     - multipart/form-data
 *     parameters:
 *     - in: formData
 *       name: upFile
 *       type: array
 *       items:
 *         type: file
 *         required: true
 *       maxItems: 5
 *       minItems: 1
 *       description: the file to upload.
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
// fileUploads.array('upFile', 5)


Router.post("/gallery/uploadGallery", (response, request) => {
    GalleryController.uploadGallery(response, request);
});







/**
 * @swagger
 * /v1/api/update/gallery:
 *   post:
 *     tags:
 *       - Gallery
 *     summary: Update Specific gallery List Item
 *     description: Update Specific gallery List Item
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
 *     consumes:
 *     - multipart/form-data
 *     parameters:
 *     - in: formData
 *       name: upFile
 *       type: file
 *       description: file.
 *       name: galleryItemId
 *       type: integer
 *       description: gallery Item Id.
 *     responses:
 *       200:
 *         description: Successfull
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Access
 *       404:
 *         description: API Not Found
 *       500:
 *         description: Internal Server Error
 */
// Router.post("/update/gallery",  (response, request) => {
//     console.log("request", request.body)
//     GalleryController.updateGalleryItem(response, request);
   
// });


Router.post("/update/gallery", fileUploads.single('upFile'), (response, request) => {
    GalleryController.updateGalleryItem(response, request);
});


Router.get("/gallery/getGalleryList/:projectId", (response, request) => {
    GalleryController.getAllGalleryItemsByProjectId(response, request);
});


Router.delete("/gallery/delteGalleryItem",  async(response, request) => {
    GalleryController.deleteGalleryItem(response, request);
   
});

Router.get("/gallery/getGalleryList", (response, request) => {
    GalleryController.getAllGalleryItems(response, request);
});




module.exports = Router;