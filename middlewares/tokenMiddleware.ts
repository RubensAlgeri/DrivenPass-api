import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    
    if(!jwt.verify(token, process.env.JWT_SECRET))throw{type:401,message:"Token invalid!"}
    next();
}