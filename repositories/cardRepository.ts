import {prisma} from "../config/database.js";
import { CreateCardData } from "../services/cardService.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.card.findFirst({where: { title,userId}})}

export async function createCard(data:CreateCardData) {
    return prisma.card.create({data})
}