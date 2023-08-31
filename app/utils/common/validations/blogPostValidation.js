const Joi = require("joi");
const blogPostValidation = (data) => {
    const schema = Joi.object({
      title: Joi.string().required().max(200).messages({
        'string.base': 'Blog title  should be a string.',
        'string.empty': '  Blog Title cannot be empty.',
        'any.required': ' Blog Title is required.',
      }),
      summary: Joi.string().required().max(200).messages({
        'string.base': 'summary  should be a string.',
        'string.empty': '  summary cannot be empty.',
        'any.required': ' summary is required.',
      }),
      description: Joi.string().required().messages({
        'string.base': 'Blog description  should be a string.',
        'string.empty': 'Blog description cannot be empty.',
        'any.required': 'Blog description is required.',
      }),
      isPublished:  Joi.boolean().valid(true, false).required(),
      posted_by: Joi.string().default('admin')
    });
    return schema.validate(data);
  };

  const updateBlogValidation = (data) => {
    const schema = Joi.object({
      postId: Joi.string().required(),
      title: Joi.string().required().max(200),
      summary: Joi.string().required().max(200),
      description: Joi.string().required(),
      isPublished:  Joi.boolean().valid(true, false).required(),
      posted_by: Joi.string().default('admin')
    });
    return schema.validate(data);
  };
  const deleteBlogValidation = (data) => {
    const schema = Joi.object({
      blogId: Joi.string().required(),
     
    });
    return schema.validate(data);
  };
  module.exports = {
    blogPostValidation,
    deleteBlogValidation,
    updateBlogValidation
  }