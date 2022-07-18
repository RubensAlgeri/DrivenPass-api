import * as authRepository from "../repositories/authRepository.js";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export type CreateUserData = Omit<User,'id'>;

export async function checkEmail(email:string) {
    const check = await authRepository.checkEmail(email)
    if(check)throw{type:409,message:"Email is already used"}
}

export async function createUser(data:CreateUserData) {
    data.password = bcrypt.hashSync(data.password, +process.env.HASH);
    await authRepository.createUser(data);
}

export async function login(data: CreateUserData) {
    const user = await authRepository.checkEmail(data.email)
    if(!user)throw{type:404,message:"Email is not found"}

    if (!bcrypt.compareSync(data.password, user.password)) throw{type:401,message:"Check your email/password"}
    const token = jwt.sign(data.email, process.env.JWT_SECRET);
    return token;
}