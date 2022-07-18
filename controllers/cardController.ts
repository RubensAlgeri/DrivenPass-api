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

export async function getUserCards(req:Request, res:Response) {
    const cardId = +req.query.cardId;
    const id = +req.params.id;

    if(!cardId){
        const cards = await cardService.getUserCards(id)
        res.send({cards})
    }
    
    const card = await cardService.getCard(cardId, id)
    res.send(card)
}