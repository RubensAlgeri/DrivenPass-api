import { NextFunction, Request, Response } from "express"
import { Schema } from "joi";

const schemaValidator = (schema:Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body, { abortEarly: true });
        if (validation.error) {
        const error = validation.error.details.map(detail => detail.message);
        return res.status(422).send(error);
        }
        next();
    }
}

export default schemaValidator;