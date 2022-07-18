import * as safeNoteRepository from "../repositories/safeNoteRepository.js";
import { SafeNote } from "@prisma/client";
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

export type CreateSafeNoteData = Omit<SafeNote, "id">

export async function createSafeNote(safeNoteData:CreateSafeNoteData) {
    await safeNoteRepository.createSafeNote(safeNoteData)
}

export async function checkTitle(title:string, id:number) {
    const check = await safeNoteRepository.findByTitleAndUserId(title,id);

    if(check)throw{type:409, message:"Title already used."}
}

export async function getUserSafeNotes(id:number) {

    const safeNotes = await safeNoteRepository.getUserSafeNotes(id)
    return safeNotes
}

export async function getSafeNote(safeNoteId:number,id:number) {

    const safeNote = await safeNoteRepository.getSafeNote(safeNoteId, id)
    if(!safeNote)throw{type:404,message:"This safeNote does not exist!"}
    return safeNote
}

export async function deleteSafeNote(id:number, userId:number) {

    const safeNote = await safeNoteRepository.getSafeNote(id, userId);
    if(!safeNote)throw{type:404, message:"This safeNote does not exist!"}
    await safeNoteRepository.deleteSafeNote(id)
}