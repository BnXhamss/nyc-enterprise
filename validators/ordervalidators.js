import Joi from "joi";
 
export const createOrderValidator = Joi.object({
    customersName: Joi.string().required(),
    customersEmail: Joi.string().email().optional(),
    customersPhone: Joi.string().required(),
    OrderDescription: Joi.array().items().required()
});