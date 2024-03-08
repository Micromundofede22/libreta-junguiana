import mongoose from "mongoose";

const synchronicitiesSchema = new mongoose.Schema({
  synchronicity: {
    type: [
      {
        title: { type: String, required: true },
        body: { type: String, required: true },
        image_synchro: { type: String, required: false },
        interpretation: { type: String, required: false },
        feelings: {
            //esperanza - tristeza - divertido - miedo - confuso
             type: String, 
             required: false },
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

mongoose.set("strictQuery", false);

const synchronicitiesModel= new mongoose.model("synchronicities", synchronicitiesSchema);

export default synchronicitiesModel;
