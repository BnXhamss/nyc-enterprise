import Joi from "joi";
 
export const createOrderValidator = Joi.object({
    Name: Joi.string().required(),
    Location: Joi.string().required(),
    Phone: Joi.string().required(),
    OrderDescription: Joi.array().items().required()
});