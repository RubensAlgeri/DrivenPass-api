import {prisma} from "../config/database.js";
import { CreateUserData } from "../services/authService.js";

export function checkEmail(email:string) {
    return prisma.user.findUnique({where:{email}})
}

export function createUser(data:CreateUserData) {
    return prisma.user.create({data})
}

export function checkToken(id:number) {
    return prisma.user.findUnique({where:{id}})
}