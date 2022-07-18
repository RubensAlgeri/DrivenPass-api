import { NextFunction, Request, Response } from "express"
import { checkToken } from "../repositories/authRepository.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const id = + req.params.id;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    const validation = jwt.verify(token, process.env.JWT_SECRET)
    
    if(!validation)throw{type:401,message:"Token invalid!"}

    const user = await checkToken(id)

    if(user.email !== validation)throw{type:401, message:"Invalid token!"}

    next();
}