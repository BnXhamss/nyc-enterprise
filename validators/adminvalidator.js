import Joi from "joi";

export const adminRegisterValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
}).with("password", "confirmPassword");

export const adminLoginValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().required(),
});

export const updateAdminValidator = Joi.object({
  role: Joi.string().valid( "admin").required(),
});
