const Joi = require("joi");
const amenityValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'string.base': 'Amenity name should be a string.',
        'string.empty': ' Amenity Name cannot be empty.',
        'any.required': 'Amenity Name is required.',
      }),
    });
    return schema.validate(data);
  };

  const getAmenityValidation = (data) => {
    const schema = Joi.object({
      projectId: Joi.string().required().messages({
        'string.base': 'Project Id  should be a string.',
        'string.empty': ' Project Id  cannot be empty.',
        'any.required': 'Project Id  is required.',
      }),
    });
    return schema.validate(data);
  };


  const addAmenityValidation = (data) => {
    const schema = Joi.object({
      projectId: Joi.string().required().messages({
        'string.base': 'projectId  should be a string.',
        'string.empty': '  projectId cannot be empty.',
        'any.required': ' projectId is required.',
      }),
      amenities: Joi.array().required()
    });
    return schema.validate(data);
  };

  module.exports = {
    amenityValidation,
    addAmenityValidation,
    getAmenityValidation
  }