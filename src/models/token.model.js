import mongoose from "mongoose";

const tokenSchema= new mongoose.Schema({
    token: {type: String, required:true},
    email: {type:String, required:true}
});

const tokenModel= new mongoose.model("token", tokenSchema);

mongoose.set("strictQuery",false);

export default tokenModel;