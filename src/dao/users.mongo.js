import usersModel from "../models/users.model.js";

export default class UsersMongoDao{
    create= async(data)=> await usersModel.create(data);
    get= async() =>  await usersModel.find();
    getById= async(id) =>  await usersModel.findById(id);
    getOne= async(data) =>  await usersModel.findOne(data);
    update= async(id,data) => await usersModel.findByIdAndUpdate(id,data);
    delete= async(id) => await usersModel.findByIdAndDelete(id);
}