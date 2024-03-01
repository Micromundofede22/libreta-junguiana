import dreamModel from "../models/dreams.model.js";

export default class DreamsMongoDAO{
    create= async(data)=> await dreamModel.create(data);
    get= async() =>  await dreamModel.find();
    getById= async(id) =>  await dreamModel.findById(id);
    getOne= async(data) =>  await dreamModel.findOne(data);
    update= async(id,data) => await dreamModel.findByIdAndUpdate(id,data, { returnDocument: "after" });
    delete= async(id) => await dreamModel.findByIdAndDelete(id);
};