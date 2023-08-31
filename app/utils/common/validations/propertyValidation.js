const Joi = require("joi");

/**
 * Date: 18-08-2023
 * Author: Dinesh
 * Description: Create new Signup validation
 */


const createProjectValidation = (data) =>{
    console.log("Vaidatadata", data)
const schema = Joi.object({ 
    projectName: Joi.string().required().min(3).max(200).messages({
        'string.base': 'Project Name should be a string.',
        'string.empty': 'Project Name cannot be empty.',
        'string.min': 'Project Name should have a minimum length of {#limit} characters.',
        'string.max': 'Project Name should have a maximum length of {#limit} characters.',
        'any.required': 'Project Name is required.',
      }),
    //   ProjectImage: Joi.object({
    //     mimetype: Joi.string()
    //       .valid('image/jpeg', 'image/jpg', 'image/png', 'image/gif')
    //       .required(),
    //   }).required(),
    //   architectureMap: Joi.object({
    //     mimetype: Joi.string()
    //       .valid('image/jpeg', 'image/jpg', 'image/png', 'image/gif')
    //       .required(),
    //   }).required(),
    //   projectPdf: Joi.object({
    //     mimetype: Joi.string()
    //       .valid('image/jpeg', 'image/jpg', 'image/png', 'image/gif')
    //       .required(),
    //   }).required(),
 location: Joi.string().required().max(100).messages({
    'string.base': 'Locatio should be a string.',
    'string.empty': 'Location cannot be empty.',
    'any.required': 'Location  is required.',
  }),
  
 description: Joi.string().required().messages({
    'string.base': 'Description should be a string.',
    'string.empty': 'Description cannot be empty.',
    'any.required': 'Description  is required.',
  }),
  flatSize: Joi.string().required().max(100).required(),
  floors: Joi.string().required().max(100).required(),
  type: Joi.string().required().valid('commercial', 'residential'),
  address: Joi.string().required(),
  status: Joi.string().required().valid('ongoing', 'completed', 'upcoming'),
  area: Joi.string().pattern(new RegExp(/^[1-9][0-9]*$/)).required(),
//   projectStart: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`,}).required(),
//   firstSale: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`,}).required(),
 city:Joi.string().required().max(100).messages({
    'string.base': 'City Name should be a string.',
    'string.empty': 'City name cannot be empty.',
    'string.max': 'City Name should have a maximum length of {#limit} characters.',
    'any.required': 'City Name is required.',
  }),
 state: Joi.string().required().max(100).messages({
    'string.base': 'State Name should be a string.',
    'string.empty': 'State Name cannot be empty.',
    'string.max': 'State Name should have a maximum length of {#limit} characters.',
    'any.required': 'State Name is required.',
  }),
 pinCode: Joi.string().required().max(6).messages({
    'string.base': 'Pin Code should be a Integer.',
    'string.empty': 'Pin Code cannot be empty.',
    'string.max': 'Pin Code should have a maximum length of {#limit} characters.',
    'any.required': 'Pin Code is required.',
  }),

 createdAt: Joi.date().default(Date.now),
 updatedAt: Joi.date().default(Date.now)
})
return schema.validate(data);
}




const updateProjectValidation = (data) =>{
    console.log("Vaidatadata", data)
const schema = Joi.object({ 
    project_id: Joi.string().required().messages({
        'string.base': 'Project Id should be a string.',
        'string.empty': 'Project Id cannot be empty.',
        'any.required': 'Project Id is required.',
      }),
    projectName: Joi.string().required().min(3).max(200).messages({
        'string.base': 'Project Name should be a string.',
        'string.empty': 'Project Name cannot be empty.',
        'string.min': 'Project Name should have a minimum length of {#limit} characters.',
        'string.max': 'Project Name should have a maximum length of {#limit} characters.',
        'any.required': 'Project Name is required.',
      }),
 location: Joi.string().required().max(100).messages({
    'string.base': 'Locatio should be a string.',
    'string.empty': 'Location cannot be empty.',
    'any.required': 'Location  is required.',
  }),
  
 description: Joi.string().required().messages({
    'string.base': 'Description should be a string.',
    'string.empty': 'Description cannot be empty.',
    'any.required': 'Description  is required.',
  }),
  flatSize: Joi.string().required().max(100).required(),
  floors: Joi.string().required().max(100).required(),
  type: Joi.string().required().valid('commercial', 'residential'),
  address: Joi.string().required(),
  status: Joi.string().required().valid('ongoing', 'completed', 'upcoming'),
  area: Joi.string().pattern(new RegExp(/^[1-9][0-9]*$/)).required(),
//   projectStart: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`,}).required(),
//   firstSale: Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`,}).required(),
 city:Joi.string().required().max(100).messages({
    'string.base': 'City Name should be a string.',
    'string.empty': 'City name cannot be empty.',
    'string.max': 'City Name should have a maximum length of {#limit} characters.',
    'any.required': 'City Name is required.',
  }),
 state: Joi.string().required().max(100).messages({
    'string.base': 'State Name should be a string.',
    'string.empty': 'State Name cannot be empty.',
    'string.max': 'State Name should have a maximum length of {#limit} characters.',
    'any.required': 'State Name is required.',
  }),
 pinCode: Joi.string().required().max(6).messages({
    'string.base': 'Pin Code should be a Integer.',
    'string.empty': 'Pin Code cannot be empty.',
    'string.max': 'Pin Code should have a maximum length of {#limit} characters.',
    'any.required': 'Pin Code is required.',
  }),
  projectImage: Joi.string().optional(),
  architectureMap: Joi.string().optional(),
  projectPdf: Joi.string().optional(),

 createdAt: Joi.date().default(Date.now),
 updatedAt: Joi.date().default(Date.now)
})
return schema.validate(data);
}


const deleteProjectValidation = (data) =>{
  const schema = Joi.object({
      projectId: Joi.string().required(),
      isActive: Joi.boolean().valid(true, false).required(),
  
  })
  return schema.validate(data);
  }
const getProjectDetialsValidation = (data) =>{
  const schema = Joi.object({
      projectId: Joi.string().required()
  
  })
  return schema.validate(data);
  }
const paginationValidation = (data) =>{
    const schema = Joi.object({
        pageNumber: Joi.number()
        .integer()
        .min(1), 
      pageSize: Joi.Joi.number()
      .integer()
      .min(5)
    })
    return schema.validate(data);
    }

    const projectHighlightsValidataion = (data) => {
      const schema = Joi.object({
        projectId: Joi.string().required().messages({
          'string.base': 'projectId  should be a string.',
          'string.empty': '  projectId cannot be empty.',
          'any.required': ' projectId is required.',
        }),
        highlights: Joi.array().required()
      });
      return schema.validate(data);
    };
  

module.exports = {
    createProjectValidation,
    paginationValidation,
    updateProjectValidation,
    getProjectDetialsValidation,
    deleteProjectValidation,
    projectHighlightsValidataion
};
