import * as wifiRepository from "../repositories/wifiRepository.js";
import { WifiPassword } from "@prisma/client";
import {decrypt} from '../utils/decrypt.js'
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

export type CreateWifiData = Omit<WifiPassword, "id">

export async function createWifi(wifiData:CreateWifiData) {
    wifiData.password = cryptr.encrypt(wifiData.password)
    await wifiRepository.createWifi(wifiData)
}

export async function checkTitle(title:string, id:number) {
    const check = await wifiRepository.findByTitleAndUserId(title,id);

    if(check)throw{type:409, message:"Title already used."}
}

export async function getUserWifis(id:number) {

    const wifis = await wifiRepository.getUserWifis(id)
    wifis.forEach(async wifi=>{wifi.password = await decrypt(wifi.password)})
    return wifis
}

export async function getWifi(wifiId:number,id:number) {

    const wifi = await wifiRepository.getWifi(wifiId, id)
    if(!wifi)throw{type:404,message:"This wifi does not exist!"}
    wifi.password = await decrypt(wifi.password)
    return wifi
}

export async function deleteWifi(id:number, userId:number) {

    const wifi = await wifiRepository.getWifi(id, userId);
    if(!wifi)throw{type:404, message:"This wifi does not exist!"}
    await wifiRepository.deleteWifi(id)
}