const Express = require("express");
const Router = Express.Router();
const ContactController = require("../controllers/ContactController")


/**
 * Date: 18-08-2023
 * Author:Dinesh
 * Description: Contact
 */


/**
 * @swagger
 * /v1/api/contact:
 *   post:
 *     tags:
 *       - Contact
 *     summary: Submit Contact
 *     description: Submit Contact Details
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
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
 *       - name: subject
 *         description: subject
 *         in: formData
 *         required: false
 *         type: string
 *       - name: message
 *         description: message content
 *         in: formData
 *         required: true
 *         type: string 
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



Router.post("/contact/addContact",  (response, request) => {
    ContactController.Conatact(response, request);
});



Router.get("/contact/getContactList",  (response, request) => {
    ContactController.getContactList(response, request);
});

Router.get("/contact/getEnquiryCount",  (response, request) => {
    ContactController.getAllEnquiryCount(response, request);
});
module.exports = Router;