import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as utils from "../utils/checkCard.js";

import {faker} from '@faker-js/faker';
import dayjs from 'dayjs'
import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function createCard(name:string, id:number, type) {
    const number = faker.random.numeric(12).toString();
    const CVC = faker.random.numeric(3).toString();
    const expirationDate = dayjs().add(5,"year").format("MM/YY")

    const encryptedCVC = cryptr.encrypt(CVC);

    const cardData = {
        employeeId:id,
        number,
        cardholderName:name,
        securityCode:encryptedCVC,
        expirationDate,
        isVirtual:false,
        isBlocked:true,
        type
    }

    await cardRepository.insert(cardData)
}

export async function hasSameTypeCard(type, id:number) {
    const card = await cardRepository.findByTypeAndEmployeeId(type, id)
    if(card) throw{type:409, message:"A card with the same type alredy exists"}
}

export async function validateCard(CVC:string, id:number) {
    const card = await utils.checkCard(id)

    if(card.password !==null) throw{type:404}

    const decryptedCVC = cryptr.decrypt(card.securityCode);
    if(CVC !== decryptedCVC) throw{type:401, message:"This is the incorect card"}

}
export async function updateCard(password:string, id:number) {
    const encryptedPassword = cryptr.encrypt(password)

    const cardData = {
        password: encryptedPassword,
        isBlocked: false
    }

    await cardRepository.update(id, cardData)
    
}

export async function changeBlockStatus(id:number, password:string) {
    const card = await utils.checkCard(id)

    await utils.checkExpirationDate(card.expirationDate)

    await utils.checkPassword(password, card.password)

    const blockCard = {
        isBlocked: !card.isBlocked
    }

    await cardRepository.update(card.id, blockCard)
}

export async function checkCardValidation(id:number) {
    const card = await utils.checkCard(id)

    if(card.isBlocked) throw{type:401, message:"This card is blocked"}

    await utils.checkExpirationDate(card.expirationDate)

    return card;
}

export async function checkCard(id:number) {
    await utils.checkCard(id)
}

export async function checkPassword(password:string, encryptedPassword:string) {
    await utils.checkPassword(password, encryptedPassword)
}

export async function getBalance(cardId:number) {

    const recharges:number = await rechargeRepository.rechargesSumByCard(cardId)
    const payments:number = await paymentRepository.paymentsSumByCard(cardId)

    return recharges - payments;
    
}

export async function getTransactionsByCard(cardId:number) {
    const transactions = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargeRepository.findByCardId(cardId)

    return {transactions, recharges};
}