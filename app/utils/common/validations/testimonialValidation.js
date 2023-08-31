const Joi = require("joi");
const testimonialValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(200).messages({
        'string.base': 'name should be a string.',
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name should have a minimum length of {#limit} characters.',
        'string.max': 'Name should have a maximum length of {#limit} characters.',
        'any.required': 'Name is required.',
      }),
      location: Joi.string().required(),
      designation: Joi.string().optional(),
     review: Joi.string().required()
    });
    return schema.validate(data);
  };


  const deleteTestimonyValidation = (data) => {
    const schema = Joi.object({
      id: Joi.string().required().min(3).max(200).messages({
        'string.base': 'Testimony Id should be a string.',
        'string.empty': 'Testimony Idcannot be empty.',
        'any.required': 'Testimony Id is required.',
      }),
   
    });
    return schema.validate(data);
  };

  module.exports = {
    testimonialValidation,
    deleteTestimonyValidation
  }