import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';

export async function createCard(req:Request, res:Response) {
    const {number, holderName, cvv, password, expirationDate, type, title, isVirtual} = req.body;
    const id = +req.params.id;
    const data = {number, holderName, cvv, password, expirationDate, type, title, isVirtual, userId:id}
    await cardService.checkTitle( title, id)
    await cardService.createCard(data)
    res.sendStatus(201)
}