import Joi from "joi";

export const addProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(), // Ensure price is a string
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().valid("Wedding", "Birthday").required(),
});

export const replaceProductDetails = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(), // Make the image field optional
  category: Joi.string().valid("Wedding", "Birthday").optional(),
});

// adminId: Joi.string().required(), // Ensure adminId is provided