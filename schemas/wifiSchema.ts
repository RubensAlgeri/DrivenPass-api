import joi from "joi";

export const wifiSchema = joi.object({
    netName: joi.string().required(),
    password: joi.string().required(),
    title: joi.string().max(50).required()
});