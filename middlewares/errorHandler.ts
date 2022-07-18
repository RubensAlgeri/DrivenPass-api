import { NextFunction, Request, Response } from "express"

export default async function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {
    if(error.type===401) return res.status(401).send(error.message);
    if(error.type===404) return res.status(404).send(error.message);
    if(error.type===409) return res.status(409).send(error.message);
    return res.sendStatus(500);
}