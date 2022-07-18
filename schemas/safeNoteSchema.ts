import joi from "joi";

export const safeNoteSchema = joi.object({
    annotation: joi.string().max(1000).required(),
    title: joi.string().max(50).required()
});