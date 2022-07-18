import * as cardRepository from "../repositories/cardRepository.js";
import { Card } from "@prisma/client";
import { decrypt } from "../utils/decrypt.js";
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

export async function getUserCards(id:number) {

    const cards = await cardRepository.getUserCards(id)
    cards.forEach(async card=>{card.password = await decrypt(card.password)})

    return cards
}

export async function getCard(cardId:number,id:number) {

    const card = await cardRepository.getCard(cardId, id)
    if(!card)throw{type:404,message:"This card does not exist!"}
    card.password = await decrypt(card.password)
    return card
}

export async function deleteCard(id:number, userId:number) {

    const card = await cardRepository.getCard(id, userId);
    if(!card)throw{type:404, message:"This card does not exist!"}
    await cardRepository.deleteCard(id)
}