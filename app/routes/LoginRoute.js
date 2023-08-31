const LoginController = require("../controllers/LoginController")
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
 * /v1/api/admin/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Registration
 *     description: registration details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email Id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: formData
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

Router.post("/admin/login", (response, request) => {
    LoginController.adminLogin(response, request);
});

/**
 * @swagger
 * /v1/api/admin/createUser:
 *   post:
 *     tags:
 *       - User
 *     summary: Create User
 *     description: User Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email Id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: formData
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

Router.post("/admin/createUser", (response, request) => {
    LoginController.createUser(response, request);
});








module.exports = Router;