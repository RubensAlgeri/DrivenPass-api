import * as credentialRepository from "../repositories/credentialRepository.js";
import { Credential } from "@prisma/client";
import {decrypt} from '../utils/decrypt.js'
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

export type CreateCredentialData = Omit<Credential, "id">

export async function createCredential(credentialData:CreateCredentialData) {
    credentialData.password = cryptr.encrypt(credentialData.password)
    await credentialRepository.createCredential(credentialData)
}

export async function checkTitle(title:string, id:number) {
    const check = await credentialRepository.findByTitleAndUserId(title,id);

    if(check)throw{type:409, message:"Title already used."}
}

export async function getUserCredentials(id:number) {

    const credentials = await credentialRepository.getUserCredentials(id)
    credentials.forEach(async credential=>{credential.password = await decrypt(credential.password)})
    return credentials
}

export async function getCredential(credentialId:number,id:number) {

    const credential = await credentialRepository.getCredential(credentialId, id)
    if(!credential)throw{type:404,message:"This credential does not exist!"}
    credential.password = await decrypt(credential.password)
    return credential
}

export async function deleteCredential(id:number, userId:number) {

    const credential = await credentialRepository.getCredential(id, userId);
    if(!credential)throw{type:404, message:"This credential does not exist!"}
    await credentialRepository.deleteCredential(id)
}