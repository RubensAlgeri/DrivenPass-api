import joi from "joi";

export const cardSchema = joi.object({
    number: joi.string().regex(/^[0-9]{12}$/).required(),
    holderName: joi.string().required(),
    cvv: joi.string().regex(/[0-9]{3}$/).required(),
    password: joi.string().required(),
    expirationDate: joi.string().regex(/^[0-9]{2}\/[0-9]{2}$/),
    type: joi.string().valid('credit', 'debit', 'credit_debit').required(),
    title: joi.string().max(50).required(),
    isVirtual: joi.boolean().strict().required()
});