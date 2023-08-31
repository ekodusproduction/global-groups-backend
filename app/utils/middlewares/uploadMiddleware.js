const multer = require("multer");
const path = require('path');
const {imageFilter} = require("../common/CommonFunction")
const fileUploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
     cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => {
     cb(
      null,
        file.originalname  
        .split(".")[0]
             .trim()
         .replace(" ", "_") 
       +
        "-" +
         Date.now() +
        "." 
       +
       file.originalname.split(".")[1].trim()
       //  path.extname(file.originalname)
      );
     },
   });
   
   const fileUploads = multer({
     storage: fileUploadStorage,
    fileFilter: imageFilter,
     onError: function (error, next) {
        console.log("error", error)
       next(error); 
    },
   })
   module.exports = {
    fileUploads
   };