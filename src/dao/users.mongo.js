import usersModel from "../models/users.model.js";

export default class UsersMongoDao{
    create= async(data)=> await usersModel.create(data);
    get= async() =>  await usersModel.find().select("-password");
    getById= async(id) =>  await usersModel.findById(id).select("-password");
    getOne= async(data) =>  await usersModel.findOne(data);
    update= async(id,data) => await usersModel.findByIdAndUpdate(id,data, {returnDocument:"after"});
    delete= async(id) => await usersModel.findByIdAndDelete(id);
}