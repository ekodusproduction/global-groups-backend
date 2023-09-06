const Express = require("express");
const Router = Express.Router();
const BlogController = require("../controllers/BlogController")
const fileUpload = require("../utils/middlewares/uploadMiddleware")

/**
 * Date: 18-08-2023
 * Author:Dinesh
 * Description: Blog
 */


/**
 * @swagger
 * /v1/api/blog/addostBlog:
 *   post:
 *     tags:
 *       - Blog Post
 *     summary: Add Blog Post
 *     description: Add Blog Post
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
  *     parameters:
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: summary
 *         description: overview of the Blog post
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: content of the Blog Post
 *         in: formData
 *         required: false
 *         type: string
 *       - name: is_published
 *         description: publish the Blog post
 *         in: formData
 *         required: true
 *         type: string 
  *       - name: posted_by
 *         description: Atuhor of the post
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



Router.post("/blog/addBlogPost", (response, request) => {
    BlogController.PostBlog(response, request);
});


/**
 * @swagger
 * /v1/api/updateBlogPost:
 *   post:
 *     tags:
 *       - Blog Post
 *     summary: Update a Blog Post
 *     description: Update a Blog Post By Specific Post Id
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
 *     parameters:
 *       - name: blogPostId
 *         description: Blog Post Id
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: summary
 *         description: overview of the Blog post
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: content of the Blog Post
 *         in: formData
 *         required: false
 *         type: string
 *       - name: is_published
 *         description: publish the Blog post
 *         in: formData
 *         required: true
 *         type: string 
  *       - name: posted_by
 *         description: Atuhor of the post
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

Router.post("/blog/updateBlogPost",  (response, request) => {
    BlogController.updateBlogPost(response, request);
});

/**
 * @swagger
 * /v1/api/deleteBlog:
 *   delete:
 *     tags:
 *       - Blog Post
 *     summary: Delete blog Post
 *     description: Delete Blog Post By postId
 *     produces:
 *       - application/json
 *     security:
 *     - appToken: []
  *     parameters:
 *       - name: blogPostId
 *         description: post Id
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
Router.delete("/blog/deleteBlogPost/:blogId",  (response, request) => {
    BlogController.deleteBlogPost(response, request);
});



Router.get("/blog/getBlogPostList",  (response, request) => {
    BlogController.getBlogPostList(response, request);
});

Router.get("/blog/getAdminBlogPostList",  (response, request) => {
    BlogController.getBlogPostListForAdmin(response, request);
});


Router.get("/blog/getBlogPostById/:blogId",  (response, request) => {
    BlogController.getBlogPostById(response, request);
});
module.exports = Router;