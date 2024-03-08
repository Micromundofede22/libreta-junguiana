import synchronicitiesModel from "../models/synchronicities.model.js";

export default class SynchronicitiesMongoDao{
    create= async(data)=> await synchronicitiesModel.create(data);
    get= async() =>  await synchronicitiesModel.find();
    getById= async(id) =>  await synchronicitiesModel.findById(id);
    update= async(id,data) => await synchronicitiesModel.findByIdAndUpdate(id,data, {returnDocument: "after"});
    delete= async(id) => await synchronicitiesModel.findByIdAndDelete(id);
};