import { Request, Response } from "express";
import * as safeNoteService from '../services/safeNoteService.js';

export async function createSafeNote(req:Request, res:Response) {
    const {annotation, title} = req.body;
    const id = +req.params.id;
    const data = {annotation, title, userId:id}
    await safeNoteService.checkTitle( title, id)
    await safeNoteService.createSafeNote(data)
    res.sendStatus(201)
}

export async function getUserSafeNotes(req:Request, res:Response) {
    const safeNoteId = +req.query.safeNoteId;
    const id = +req.params.id;

    if(!safeNoteId){
        const safeNotes = await safeNoteService.getUserSafeNotes(id)
        res.send({safeNotes})
    }

    const safeNote = await safeNoteService.getSafeNote(safeNoteId, id)
    res.send(safeNote)
}

export async function deleteSafeNote(req:Request, res:Response){
    const id = +req.params.id;
    const userId = +req.params.userId;

    await safeNoteService.deleteSafeNote(id, userId)

    res.sendStatus(200)
}