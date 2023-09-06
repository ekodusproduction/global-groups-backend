const EventEmitter = require("../utils/common/EventEmitter");
const StatusCode = require("../utils/common/constant");
const {blogPostValidation, deleteBlogValidation, updateBlogValidation} = require("../utils/common/validations/blogPostValidation")
const BlogService = require('../services/BlogService')
const {validateAndProcessFile} = require("../utils/common/CommonFunction")
const PostBlog = (request, response) =>{
    let apiName = "postBlog";
    const { error } = blogPostValidation(request.body);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("postBlog", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.SUCCESS).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    result: StatusCode.successMessage.FAIL,
                    message: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    } else {
        if(!request.files || Object.keys(request.files).length === 0){
            commonBlogAddLogic(request, response, apiName)
        }else{
            let imageError = validateAndProcessFile(request.files?.blogImage);
            if(imageError?.length > 0){
                EventEmitter.errorEmitter("createProject", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    projecImageError,
                    StatusCode.statusCode.BAD_REQUEST,
                ]);
                return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                    status: StatusCode.statusCode.BAD_REQUEST,
                    data: {
                        message: imageError,
                       
                    },
                });
            }

             commonBlogAddLogic(request, response, apiName)
        }

      
    }
}
const deleteBlogPost = (request, response) =>{
    let apiName = "deleteBlogPost";
    const { error } = deleteBlogValidation(request.params);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("deleteBlogPost", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: StatusCode.successMessage.FAIL,
                    result: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    } else {
        return new Promise(function () {
            BlogService.DeleteBlogPostService(request).then((result) => {
                console.log("result", result)
                if(result?.notFound){
                    EventEmitter.errorEmitter("deleteBlogPost", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "delete",
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.DATA_NOT_FOUND,
                        data: {
                            result: StatusCode.successMessage.FAIL,
                            message: result?.message,
                        },
                    });
                }else if(!result?.notFound && result?.deleted){
                    EventEmitter.auditEmitter("deleteBlogPost", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "delete",
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.SUCCESS,
                        data: {
                            result: StatusCode.successMessage.SUCCESSFULL,
                            message: result?.message,
                        },
                    });
                }
                  
                   
                
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("deleteBlogPost", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err,
                StatusCode.statusCode.BAD_REQUEST,
            ]);

            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err },
            });
        });
    }
}

const updateBlogPost = (request, response) =>{
    let apiName = "updateBlogPost";
    const { error } = updateBlogValidation(request.body);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("updateBlogPost", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: StatusCode.successMessage.FAIL,
                    result: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    } else {
        if(!request.files || Object.keys(request.files).length === 0){
            commonUpdateLogic(request, response, apiName)
        }else{
            let imageError = validateAndProcessFile(request.files?.blogImage);
            if(imageError?.length > 0){
                EventEmitter.errorEmitter("updateBlogPost", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    projecImageError,
                    StatusCode.statusCode.BAD_REQUEST,
                ]);
                return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                    status: StatusCode.statusCode.BAD_REQUEST,
                    data: {
                        message: errors,
                       
                    },
                });
            }

            commonUpdateLogic(request, response, apiName)
        }

       
    }
}

const commonBlogAddLogic = (request, response, apiName)=>{
    return new Promise(function () {
        BlogService.BlogPostService(request).then((result) => {
            console.log("result", result)
            if(result){
                EventEmitter.auditEmitter("postBlog", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "Add",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message:
                            StatusCode.successMessage
                                .BLOG_POSTED_SUCCESSFULLY,
                    },
                });
            }else{

            }
              
               
            
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("postBlog", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err,
            StatusCode.statusCode.BAD_REQUEST,
        ]);

        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err },
        });
    });
}

const commonUpdateLogic = (request, respose, apiName) =>{
    return new Promise(function () {
        BlogService.updateBlogPostService(request).then((result) => {
            console.log("result", result)
            if(result){
                EventEmitter.auditEmitter("updateBlogPost", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "Update",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message:
                            StatusCode.successMessage
                                .BLOG_POSTED_SUCCESSFULLY,
                    },
                });
            }else{
                EventEmitter.errorEmitter("updateBlogPost", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    StatusCode.errorMessage.INVALID_BLOG_ID,
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message:
                            StatusCode.errorMessage.INVALID_BLOG_ID,
                    },
                })
            }      
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("deleteBlogPost", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err,
            StatusCode.statusCode.BAD_REQUEST,
        ]);

        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err },
        });
    });
}


const getBlogPostListForAdmin = (request, response) =>{
    let apiName = "getBlogPostListForAdmin";
    return new Promise(function () {
        BlogService.getBlogPostListAdminService(request).then((result) => {
            console.log("result", result)
        
                EventEmitter.auditEmitter("getBlogPostListForAdmin", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "Update",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: result
                });
              
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getBlogPostListForAdmin", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err,
            StatusCode.statusCode.BAD_REQUEST,
        ]);

        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err },
        });
    });
    
}

const getBlogPostList = (request, response) =>{
    let apiName = "getBlogPostList";
    return new Promise(function () {
        BlogService.getBlogPostListService(request).then((result) => {
            console.log("result", result)
        
                EventEmitter.auditEmitter("getBlogPostList", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "Update",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: result
                });
              
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("getBlogPostList", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err,
            StatusCode.statusCode.BAD_REQUEST,
        ]);

        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err },
        });
    });
    
}


const getBlogPostById = (request, response) =>{
    let apiName = "getBlogPostById";
    const { error } = deleteBlogValidation(request.params);
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("getBlogPostById", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: StatusCode.successMessage.FAIL,
                    result: error.details[0].message.replace(
                        /[^a-zA-Z0-9 ]/g,
                        ""
                    ),
                },
            });
        }
    }else{
        return new Promise(function () {
            BlogService.getBlogPostByIdService(request).then((result) => {
                console.log("result", result)
            
                if(result[0].length === 0){
                    EventEmitter.auditEmitter("getProjectDetailsById", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "list",
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.DATA_NOT_FOUND,
                        data: {
                            message: StatusCode.errorMessage.NO_BLOG_DETAILS
                           
                        },
                    });
                  }else{
                    EventEmitter.auditEmitter("getProjectDetailsById", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "list",
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.SUCCESS).send({
                        status: StatusCode.statusCode.SUCCESS,
                        data: {
                            message: StatusCode.successMessage.SUCCESSFULL,
                            result: result[0],
                        },
                    });
                  }
                  
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("getBlogPostById", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
    
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err },
            });
        });
    }

    
}
module.exports = {
    PostBlog, 
    deleteBlogPost,
    updateBlogPost,
    getBlogPostList,
    getBlogPostById,
    getBlogPostListForAdmin
}
