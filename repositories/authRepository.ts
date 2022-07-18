import {prisma} from "../config/database.js";
import { CreateUserData } from "../services/authService.js";

export async function checkEmail(email:string) {
    return prisma.user.findUnique({where:{email}})
}

export async function createUser(data:CreateUserData) {
    return prisma.user.create({data})
}