import mongoose from "mongoose";

const usersSchema= new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    role: {type: String, required: true}
});

mongoose.set("strictQuery", false);

const usersModel= new mongoose.model("users", usersSchema);

export default usersModel;