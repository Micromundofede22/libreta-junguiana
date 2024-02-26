import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema({
  dreams: {
    type: [
      {
        title: { type: String, required: true },
        body: { type: String, required: true },
        image: { type: String, required: false },
        interpretation: { type: String, required: false },
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
            },
        month: {
              // 00 - 11
              type: Number,
              maxlength: 2,
            },
        year: {
              // 2022
              type: Number,
              maxlength: 4,
            },
      },
    ],
    default: []
  },
});

const dreamModel = new mongoose.model("dreams", dreamSchema);

export default dreamModel;
