import diaryModel from "../models/diary.model.js";

export default class DiaryMongoDao{
    create = async (data) => await diaryModel.create(data);
    get = async() => await diaryModel.find();
    getById= async(id) => await diaryModel.findById(id);
    getByIdAndPopulate = async(id) => await diaryModel.findById(id).populate({
        path: "diary.patient",
        select: "first_name last_name email age sex dreams" //llena solo estos campos desde el esquema del modelo patient
    }).populate({
        path:"diary.dreams_id",
        populate: {path: "dreams"},
    });
    update = async(id,data) => await diaryModel.findByIdAndUpdate(id,data,{returnDocument:"after"});
    delete = async(id) => await diaryModel.findByIdAndDelete(id);
};