import bcrypt from "bcrypt";

export const createHash= (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(15));
};