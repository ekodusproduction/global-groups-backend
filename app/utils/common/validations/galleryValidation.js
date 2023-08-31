const Joi = require("joi");
const galleryUploadValidation = (data) => {
    console.log("data", data)
    const schema = Joi.object({
        projectId: Joi.string().required(),
        files: Joi.array().length(5).items(
        Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg','image/jpg', 'image/png').required(),
            size: Joi.number().max(5 * 1024 * 1024).required(), // 5 MB limit
          })
      ),
    });
    return schema.validate(data);
  };


  const galleryItemUpdateValidation = (data) => {
    console.log("data", data)
    const schema = Joi.object({
        galleryItemId: Joi.number().required(),
        upFile: Joi.object(
            {
                fieldname: Joi.string().required(),
                originalname: Joi.string().required(),
                mimetype: Joi.string().valid('image/jpeg','image/jpg', 'image/png').required(),
                size: Joi.number().max(5 * 1024 * 1024).required(), // 5 MB limit
              }
        ).required(),
    
    });
    return schema.validate(data);
  };

  const galleryItemDeleteValidation = (data) => {
    const schema = Joi.object({
        galleryItemId: Joi.number().required(),
    
    });
    return schema.validate(data);
  };


  const galleryItemFetchValidation = (data) => {
    const schema = Joi.object({
        projectId: Joi.string().required(),
    
    });
    return schema.validate(data);
  };



  const imageValidation = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
    size: Joi.number().max(5 * 1024 * 1024).required(), // 5 MB limit
  });
  module.exports = {
    galleryUploadValidation,
    galleryItemDeleteValidation,
    galleryItemUpdateValidation,
    galleryItemFetchValidation,
    imageValidation
  }