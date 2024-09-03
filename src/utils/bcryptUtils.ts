
import bcrypt from "bcrypt";




const SALT_ROUNDS = 10;


export async function hashPassword(password:string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  


  export async function comparePassword(password:string, hash:string) {
    const match = await bcrypt.compare(password, hash);
    return match;
  }
