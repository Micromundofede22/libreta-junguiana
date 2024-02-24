import mongoose from "mongoose";

const dreamSchema= new mongoose.Schema({
    title: {type: String, required: true},
    body:{type: String, required:true},
    image: {type: String, required: false},
    interpretation: {type: String, required: false}

});

const dreamModel= new mongoose.model("dreams", dreamSchema);

export default dreamModel;