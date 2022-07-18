import { Request, Response } from "express";
import * as credentialService from '../services/credentialService.js';

export async function createCredential(req:Request, res:Response) {
    const {url, password, title} = req.body;
    const id = +req.params.id;
    const data = {url, password, title, userId:id}
    await credentialService.checkTitle( title, id)
    await credentialService.createCredential(data)
    res.sendStatus(201)
}

export async function getUserCredentials(req:Request, res:Response) {
    const credentialId = +req.query.credentialId;
    const id = +req.params.id;

    if(!credentialId){
        const credentials = await credentialService.getUserCredentials(id)
        res.send({credentials})
    }

    const credential = await credentialService.getCredential(credentialId, id)
    res.send(credential)
}

export async function deleteCredential(req:Request, res:Response){
    const id = +req.params.id;
    const userId = +req.params.userId;

    await credentialService.deleteCredential(id, userId)

    res.sendStatus(200)
}