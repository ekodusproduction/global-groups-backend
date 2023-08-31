const Joi = require("joi");

/**
 * Date: 18-08-2023
 * Author: Dinesh
 * Description:  validation for registration and login
 */

const RegistrationValidation = (data) =>{
const schema = Joi.object({
  name: Joi.string().required().max(100),
 emailId: Joi.string().required().max(100).email(),
 projectName: Joi.string().required().max(100),
 message: Joi.string().required(),
 phoneNumber: Joi.string().pattern(
  new RegExp('^[0-9]{10}$')
  ).required(),

})
return schema.validate(data);
}

const loginValidation = (data) => {
  console.log("data", data)
  const schema = Joi.object({
    emailId: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  });

  return schema.validate(data);
};


module.exports = {
  RegistrationValidation
  , loginValidation
};
