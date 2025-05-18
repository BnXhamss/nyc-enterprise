import Joi from "joi";
 
export const createOrderValidator = Joi.object({
    customersName: Joi.string().required(),
    customersEmail: Joi.string().email().required(),
    customersPhone: Joi.string().required(),
    OrderDescription: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required(),
            price: Joi.number().required(),
        })
    )
        .required(),
    totalPrice: Joi.number().required(),
});