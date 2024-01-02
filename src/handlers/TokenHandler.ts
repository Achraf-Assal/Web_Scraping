import { day } from "../GlobalVar";
const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");
dotenv.config();

const secretKey:String = process.env.TOKEN_KEY as String
export const HandelTokenCreation = (id:string,duration:any)=>{
    const maxAge = duration * day; 
    return jwt.sign({id}, secretKey,{expiresIn:maxAge});
}