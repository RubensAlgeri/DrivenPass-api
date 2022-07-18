import {prisma} from "../config/database.js";
import { CreateWifiData } from "../services/wifiService.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.wifiPassword.findFirst({where: { title,userId}})}

export async function createWifi(data:CreateWifiData) {
    return prisma.wifiPassword.create({data})
}

export async function getUserWifis(userId:number) {
    return await prisma.wifiPassword.findMany({where:{userId}})
}

export async function getWifi(id:number,userId:number) {
    return await prisma.wifiPassword.findFirst({where:{id, userId}})
}

export async function deleteWifi(id:number) {
    return await prisma.wifiPassword.delete({where:{id}})
}