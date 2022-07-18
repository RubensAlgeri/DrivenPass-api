import * as cardRepository from "../repositories/cardRepository.js";
import { Card } from "@prisma/client";

import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

export type CreateCardData = Omit<Card, "id">

export async function createCard(cardData:CreateCardData) {
    cardData.password = cryptr.encrypt(cardData.password)
    cardData.cvv = cryptr.encrypt(cardData.cvv)
    await cardRepository.createCard(cardData)
}

export async function checkTitle(title:string, id:number) {
    const check = await cardRepository.findByTitleAndUserId(title,id);

    if(check)throw{type:409, message:"Title already used."}
}