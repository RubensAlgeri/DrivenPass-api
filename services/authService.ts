import * as authRepository from "../repositories/authRepository.js";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User,'id'>;

export async function createUser(data:CreateUserData) {
    await authRepository.createUser(data);
}

export async function checkEmail(email:string) {
    const check = await authRepository.checkEmail(email)
    if(check)throw{type:409,message:"Email is already used"}
}