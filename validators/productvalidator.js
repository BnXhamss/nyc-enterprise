import Joi from "joi";

export const addProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(), // Ensure price is a string
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string()
    .valid("Weddings", "birthdays", "Parties")
    .required(),
});

export const replaceProductDetails = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().optional(), // Make the image field optional
});

// adminId: Joi.string().required(), // Ensure adminId is provided