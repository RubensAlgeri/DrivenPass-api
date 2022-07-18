import {prisma} from "../config/database.js";
import { CreateSafeNoteData } from "../services/safeNoteService.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.safeNote.findFirst({where: { title,userId}})}

export async function createSafeNote(data:CreateSafeNoteData) {
    return prisma.safeNote.create({data})
}

export async function getUserSafeNotes(userId:number) {
    return await prisma.safeNote.findMany({where:{userId}})
}

export async function getSafeNote(id:number,userId:number) {
    return await prisma.safeNote.findFirst({where:{id, userId}})
}

export async function deleteSafeNote(id:number) {
    return await prisma.safeNote.delete({where:{id}})
}