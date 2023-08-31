const Joi = require("joi");
const contactValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(200).messages({
        'string.base': 'name should be a string.',
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name should have a minimum length of {#limit} characters.',
        'string.max': 'Name should have a maximum length of {#limit} characters.',
        'any.required': 'Name is required.',
      }),
      email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
      }),
      phoneNumber: Joi.string().required(),
     message: Joi.string().required()
    });
    return schema.validate(data);
  };

  module.exports = {
    contactValidation
  }