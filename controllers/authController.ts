import { Request, Response } from "express";
import * as authService from '../services/authService.js';

export async function signIn(req:Request, res:Response) {
    const {email, password} = req.body;
    const data={email,password}
    const token = await authService.login(data);
    res.status(200).send(token)
}

export async function signUp(req:Request, res:Response) {
    const {email, password} = req.body;
    const data={email,password}
    await authService.checkEmail(email);
    await authService.createUser(data);
    res.status(201)
}