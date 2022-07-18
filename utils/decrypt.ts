import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function decrypt(encrypted:string){
    const decrypted = cryptr.decrypt(encrypted)
    return decrypted
}