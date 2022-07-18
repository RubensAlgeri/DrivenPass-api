import { Request, Response } from "express";
import * as wifiService from '../services/wifiService.js';

export async function createWifi(req:Request, res:Response) {
    const {netName, password, title} = req.body;
    const id = +req.params.id;
    const data = {netName, password, title, userId:id}
    await wifiService.checkTitle( title, id)
    await wifiService.createWifi(data)
    res.sendStatus(201)
}

export async function getUserWifis(req:Request, res:Response) {
    const wifiId = +req.query.wifiId;
    const id = +req.params.id;

    if(!wifiId){
        const wifis = await wifiService.getUserWifis(id)
        res.send({wifis})
    }

    const wifi = await wifiService.getWifi(wifiId, id)
    res.send(wifi)
}

export async function deleteWifi(req:Request, res:Response){
    const id = +req.params.id;
    const userId = +req.params.userId;

    await wifiService.deleteWifi(id, userId)

    res.sendStatus(200)
}