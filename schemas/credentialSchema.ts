import joi from "joi";

export const credentialSchema = joi.object({
    url: joi.string().uri().required(),
    password: joi.string().required(),
    title: joi.string().max(50).required()
});