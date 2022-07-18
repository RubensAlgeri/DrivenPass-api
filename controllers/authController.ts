import { Request, Response } from "express";
import * as authService from '../services/authService.js';

export async function signIn(req:Request, res:Response) {
    
}

export async function signUp(req:Request, res:Response) {
    const {email, password} = req.body;
    const data={email,password}
    await authService.checkEmail(email);
    await authService.createUser(data);
    res.sendStatus(201)
}