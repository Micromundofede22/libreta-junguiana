import tokenModel from "../models/token.model.js";

export default class TokenMongoDao{
    create= async(data) => await tokenModel.create(data);
    getOne= async(data) => await tokenModel.findOne(data);
    delete= async(data) => await tokenModel.findOneAndDelete(data); 
};