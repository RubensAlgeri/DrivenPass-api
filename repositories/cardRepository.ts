import {prisma} from "../config/database.js";
import { CreateCardData } from "../services/cardService.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.card.findFirst({where: { title,userId}})}

export async function createCard(data:CreateCardData) {
    return prisma.card.create({data})
}

export async function getUserCards(userId:number) {
    return await prisma.card.findMany({where:{userId}})
}

export async function getCard(id:number,userId:number) {
    return await prisma.card.findFirst({where:{id, userId}})
}