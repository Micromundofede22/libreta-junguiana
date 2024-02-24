import dreamModel from "../models/dreams.model.js";

export default class DreamsMongoDAO{
    create= async(data)=> await dreamModel.create(data);
    get= async() =>  await dreamModel.find();
    update= async(id,data) => await dreamModel.findByIdAndUpdate(id,data);
    delete= async(id) => await dreamModel.findByIdAndDelete(id);
};