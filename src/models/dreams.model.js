import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema({
  dreams: {
    type: [
      {
        title: { type: String, required: true },
        body: { type: String, required: true },
        dream_image: { type: String, required: false },
        own_interpretation: { type: String, required: false },
        profesional_interpretation: { type: String, required: false},
        interpreted:{type:Boolean, default:false},
        interpretedBy:{type:String, default:""},
        feelings: {
            //esperanza - tristeza - divertido - miedo - confuso
             type: String, 
             required: false },
        memory: {
            // vívido - muy bueno - bueno - malo
             type: String, 
             required: true },
        date: {
              // 01 - 31
              type: Number,
              maxlength: 2,
              required: true 
            },
        month: {
              // 00 - 11
              type: Number,
              maxlength: 2,
              required: true 
            },
        year: {
              // 2022
              type: Number,
              maxlength: 4,
              required: true 
            },
      },
    ],
    default: []
  },
  quantityDreamsInterpreted: {type: String, default: 0}
});
mongoose.set("strictQuery",false);

const dreamModel = new mongoose.model("dreams", dreamSchema);

export default dreamModel;
