const RegistrationController = require("../controllers/RegistrationController")
const Authorized = require("../utils/authentication/CheckAuth");
const Express = require("express");
const AppAuth = require("../utils/authentication/AppAuth");
const Router = Express.Router();




/**
 * Date: 17-08-2023
 * Author:Dinesh
 * Description: Registration
 */


/**
 * @swagger
 * /v1/api/registration:
 *   post:
 *     tags:
 *       - Registration
 *     summary: Registration
 *     description: registration details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: emailId
 *         description: email ID
 *         in: formData
 *         required: true
 *         type: string
 *       - name: projectName
 *         description: project name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: message
 *         description: message content
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: phoneNumber
 *         description: phone Numerber
 *         in: formData
 *         type: string
 *         required: true
 *     
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

Router.post("/registration/addRegistration", (response, request) => {
    RegistrationController.Registration(response, request);
});


Router.get("/registration/getEnquiryList", (response, request) => {
    RegistrationController.getAllEnquiryList(response, request);
});





module.exports = Router;
