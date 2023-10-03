const GalleryService = require("../services/GalleryService")
const StatusCode = require("../utils/common/Constant")
const {fileSchema, galleryUploadValidation, galleryItemDeleteValidation, galleryItemUpdateValidation, galleryItemFetchValidation} = require("../utils/common/validations/galleryValidation")
const EventEmitter = require("../utils/common/EventEmitter")
const fs = require('fs')
const {validateAndProcessFile} = require("../utils/common/CommonFunction")
const path = require('path');
const {imageFilter} = require("../utils/common/CommonFunction")

const commonUploadLogic = async(request, response, apiName) =>{
    return new Promise(function () {
        GalleryService.uploadGalleryService(request).then((result) => {
            console.log("result", result)
            if(result?.flag){
                EventEmitter.auditEmitter("uploadGallery", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.SUCCESSFULL,
                       
                    },
                });
            }else{
                EventEmitter.errorEmitter("uploadGallery", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "uploadGallery",
                    StatusCode.statusCode.INTERNAL_SERVER_ERROR,
                ]);
                return response.status(StatusCode.statusCode.INTERNAL_SERVER_ERROR).send({
                    status: StatusCode.statusCode.INTERNAL_SERVER_ERROR,
                    data: {
                        message: StatusCode.successMessage.GALLERY_UPLOADED_FAILED,
                       
                    },
                });
            }
           
        });
    }).catch((err) => {
        EventEmitter.errorEmitter("uploadGallery", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
      
}   


const uploadGallery = async(request, response) =>{
    const {error} = galleryUploadValidation(request.body)
    let apiName = "uploadGallery";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("uploadGallery", [
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
    }
   else{
    //console.log("files", request.files)
   
    // console.log("fileLength",  Object.keys(request.files).length)
    if(!request.files || Object.keys(request.files).length === 0){
        EventEmitter.errorEmitter("uploadGallery", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            StatusCode.errorMessage.IMAGE_FILE_REQUIRED,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: {
                message: StatusCode.errorMessage.IMAGE_FILE_REQUIRED,
               
            },
        });
    }
   
      let modifiedFileName = []
      if (Object.keys(request.files).length > 0) {
        console.log("entered in multiple files")
        console.log("file", request?.files[0])
        const fileList = request?.files;
        let promises = []
        let error
        for(let i = 0; i < Object.keys(request.files).length; i++){
            error = validateAndProcessFile(fileList[i])
            if(error?.length > 0) break;
        }
        console.log("multipleError", error)
       if(error?.length > 0){
        EventEmitter.errorEmitter("uploadGallery", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            error,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
     
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: {
                message: error,
               
            },
        });
     }else{
        console.log("all went correct")
        const fileList = request?.files;
        for(let i = 0; i < Object.keys(request.files).length; i++){
          let  fileNameWithoutExtension = path.parse(fileList[i]?.name).name
          const fileExtension = path.extname(fileList[i]?.name);
           const cleanName = fileNameWithoutExtension.replace(/\s/g, "_");
            const fileName =  cleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now()  + fileExtension; 
            modifiedFileName.push(fileName)
            const FilePath =  path.join(__dirname, '../../images/'+fileName)
            promises.push(fileList[i].mv(FilePath))
        }
   
         request.modifiedFileName = modifiedFileName;
         Promise.all(promises).then(()=>{
             commonUploadLogic(request, response, apiName)
             }).catch((error)=>{
               EventEmitter.errorEmitter("uploadGallery", [
                   apiName,
                   StatusCode.apiVersion.VERSION1 + request.route.path,
                   error,
                   StatusCode.statusCode.INTERNAL_SERVER_ERROR,
               ]);
            
               return response.status(StatusCode.statusCode.INTERNAL_SERVER_ERROR).send({
                   status: StatusCode.statusCode.INTERNAL_SERVER_ERROR,
                   data: {
                       message: StatusCode.errorMessage.INTERNAL_SERVER_ERROR,
                      
                   },
               });
             })
     }

        
      } else {
        // Single file was uploaded
        // Handle single file here
        const files = request?.files[0]
        console.log("Name", files?.name)
      let error = validateAndProcessFile(files)
        if(error.length > 0){
            EventEmitter.errorEmitter("uploadGallery", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                error,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
         
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: {
                    message: error,
                   
                },
            })
        }
        let  fileNameWithoutExtension = path.parse(files).name
        console.log("filenamewithoutExtension", fileNameWithoutExtension)
        const fileExtension = path.extname(files.name);
        console.log("fileExtension", fileExtension)
         const cleanName = fileNameWithoutExtension.replace(/\s/g, "_");
         console.log("cleanName", cleanName)
        const fileName = cleanName   .split(".")[0]  .trim().replace(" ", "_")  +  "-" + Date.now() +"."  +fileExtension;
        const FilePath =  path.join(__dirname, '../../images/'+fileName)
        files.mv(FilePath)
        request.modifiedFileName = fileName; 
       commonUploadLogic(request, response, apiName)
            
      }

      
    }
}

const deleteGalleryItem = async(request, response) =>{
    console.log("data",request.body)
    const {error} = galleryItemDeleteValidation(request.params)
    let apiName = "uploadGallery";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("uploadGallery", [
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
            GalleryService.deleteGalleryItemService(request).then((result) => {
                console.log("result", result)
                if(result?.notFound){
                    EventEmitter.errorEmitter("deleteGalleryItem", [
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
                    EventEmitter.auditEmitter("deleteGalleryItem", [
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
            EventEmitter.errorEmitter("uploadGallery", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err.message,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err.message },
            });
        });
    }
}


const updateGalleryItem = async(request, response) =>{
    console.log("data",request.body)
    const {error} = galleryItemUpdateValidation(request.body)
    console.log("errors", error)
    let apiName = "updateGalleryItem";
    if (error) {
        console.log("error", error)
        if (error.hasOwnProperty("details")) {
            EventEmitter.errorEmitter("updateGalleryItem", [
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
            GalleryService.updateGalleryItemService(request).then((result) => {
              console.log("controllerResult", result)
                if(!result?.flag){
                    EventEmitter.errorEmitter("updateGalleryItem", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        StatusCode.errorMessage.INVALID_IMAGE_ID,
                        StatusCode.statusCode.DATA_NOT_FOUND,
                    ]);
                    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                        status: StatusCode.statusCode.BAD_REQUEST,
                        data: {
                            message: StatusCode.errorMessage.DATA_NOT_FOUND,
                            result: StatusCode.errorMessage.INVALID_IMAGE_ID,
                        },
                    });
                }
                EventEmitter.auditEmitter("updateGalleryItem", [
                    apiName,
                    StatusCode.apiVersion.VERSION1 + request.route.path,
                    "list",
                    StatusCode.statusCode.SUCCESS,
                ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.successMessage.SUCCESSFULL,
                        result: result?.message,
                    },
                });
            });
        }).catch((err) => {
            EventEmitter.errorEmitter("updateGalleryItem", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err.message,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err.message },
            });
        });
    }
}

const getAllGalleryItems = async(request, response) =>{
   let apiName = "getAllGalleryItems"
        return new Promise(function () {
            GalleryService.getAllGalleryListService(request).then((result) => {
              console.log("getAllGalleryItems", result)
              console.log("length", result[0].length)
                if(result[0].length === 0){
                    EventEmitter.errorEmitter("getAllGalleryItems", [
                        apiName,
                        StatusCode.apiVersion.VERSION1 + request.route.path,
                        "getAllGalleryItems",
                        StatusCode.statusCode.SUCCESS,
                    ]);
                    return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                        status: StatusCode.statusCode.SUCCESS,
                        data: {
                            message: StatusCode.errorMessage.DATA_NOT_FOUND,
                            result: [],
                        },
                    });
                } else if(result[0].length > 0){
                    result[0]?.forEach(element => {
                        return element[`filePath`] = `uploads/`+element?.image_name;
                         
                     });

                    EventEmitter.auditEmitter("getAllGalleryItems", [
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
            EventEmitter.errorEmitter("getAllGalleryItems", [
                apiName,
                StatusCode.apiVersion.VERSION1 + request.route.path,
                err.message,
                StatusCode.statusCode.BAD_REQUEST,
            ]);
            return response.status(StatusCode.statusCode.BAD_REQUEST).send({
                status: StatusCode.statusCode.BAD_REQUEST,
                data: { message: err.message },
            });
        });
    
}


const getAllGalleryItemsByProjectId = async(request, response) =>{

let {error} = galleryItemFetchValidation(request.params);
let apiName = "getAllGalleryItemsByProjectId"
if(error){
    if (error.hasOwnProperty("details")) {
        EventEmitter.errorEmitter("getAllGalleryItemsByProjectId", [
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
        GalleryService.getGalleryItemByProjectIdService(request).then((result) => {
          console.log("getAllGalleryItemsByProjectId", result)
          console.log("length", result[0].length)
            if(result[0].length === 0){
                // EventEmitter.errorEmitter("getAllGalleryItemsByProjectId", [
                //     apiName,
                //     StatusCode.apiVersion.VERSION1 + request.route.path,
                //    "getAllGalleryItemsByProjectId",
                //     StatusCode.statusCode.SUCCESS,
                // ]);
                return response.status(StatusCode.statusCode.SUCCESS).send({
                    status: StatusCode.statusCode.SUCCESS,
                    data: {
                        message: StatusCode.errorMessage.DATA_NOT_FOUND,
                        result: result[0],
                    },
                });
            } else if(result[0].length > 0){
             result[0]?.forEach(element => {
                   return element[`filePath`] = `uploads/`+element?.image_name;
                    
                });

                EventEmitter.auditEmitter("getAllGalleryItemsByProjectId", [
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
        EventEmitter.errorEmitter("getAllGalleryItems", [
            apiName,
            StatusCode.apiVersion.VERSION1 + request.route.path,
            err.message,
            StatusCode.statusCode.BAD_REQUEST,
        ]);
        return response.status(StatusCode.statusCode.BAD_REQUEST).send({
            status: StatusCode.statusCode.BAD_REQUEST,
            data: { message: err.message },
        });
    });
}
    
        
     
 }
module.exports = {
    uploadGallery,
    deleteGalleryItem,
    updateGalleryItem,
    getAllGalleryItems,
    getAllGalleryItemsByProjectId
}