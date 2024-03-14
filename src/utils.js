import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {fileURLToPath} from "url";
import { dirname } from "path";

export const createHash= (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(15));
};

export const isValidPassword= (user,password) => {
    return bcrypt.compareSync(password, user.password);
};

export const generateToken= (tokenInfo) => {
    const token= jwt.sign({tokenInfo}, "secret_JWT", {expiresIn: "24h"});
    return token;
};

export const extractCookie= (req) =>{
    return (req && req.cookies) ? req.cookies["cookie_name_jwt"] : null;
};

export const __filename = fileURLToPath(import.meta.url); 
export const __dirname= dirname(__filename);

//genera string random
export const generateRandomString= (num)=>{
    return [...Array(num)].map(()=>{
        const randomNum= ~~(Math.random()* 36);
        return randomNum.toString(36)
    })
    .join("")
    .toUpperCase();
};
