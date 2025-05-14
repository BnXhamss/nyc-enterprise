import Joi from "joi";

export const addProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  // category: Joi.string().required().valid('Television & Accessories', 'Video Games', 'Computer Accessories', 'Audio Systems'),
});

export const replaceProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().required(),
});