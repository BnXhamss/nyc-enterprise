import Joi from "joi";

export const addProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(), // Ensure price is a string
  description: Joi.string().required(),
  image: Joi.string().required(),
  quantity: Joi.number().required(),
  category: Joi.string()
    .valid("Wedding cake", "birthday cake", "Parties")
    .required(),
  adminId: Joi.string().required(), // Ensure adminId is provided
});

export const replaceProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().required(),
});