import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().required()
});