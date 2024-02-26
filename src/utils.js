import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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