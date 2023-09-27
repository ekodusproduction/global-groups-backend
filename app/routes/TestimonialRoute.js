const Authorized = require("../utils/authentication/CheckAuth");
const AppAuth = require("../utils/authentication/AppAuth");
const Express = require("express");
const Router = Express.Router();
const TestimonialController = require("../controllers/TestimonialController")
const fileUploads = require("../utils/middlewares/uploadMiddleware")




/**
 * Date: 17-08-2023
 * Author:Dinesh
 * Description: Testimony
 */


/**
 * @swagger
 * /v1/api/testimony/testimonial:
 *   get:
 *     tags:
 *       - Testimony
 *     summary: Get Testimonial List
 *     description: List of testimony
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



Router.post("/testimony/addTestimony", (response, request) => {
    console.log("testimony controller hitted")
    TestimonialController.addTestimony(response, request);
});


Router.post("/testimony/updateTestimony", (response, request) => {
    TestimonialController.updateTestimony(response, request);
});

Router.delete("/testimony/deleteTestimony/:id", (response, request) => {
    TestimonialController.deleteTestimony(response, request);
});


Router.get("/testimony/getTestimonyList", (response, request) => {
    console.log("testimony controller hitted once")
    TestimonialController.getAllTestimonyList(response, request);
});
module.exports = Router;