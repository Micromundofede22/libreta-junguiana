import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  diary: {
    type: [
      {
        patient: {
          //populate(diary.patient)
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        dreams: {
          type: [
            {
              //populate(diary.dreams)
              type: mongoose.Schema.Types.ObjectId,
              ref: "dreams",
              required: false,
            },
          ],
          default:[]
        },
        synchronicities: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "synchronicities",
          required: false,
        },
      },
    ],
    default: [],
  },
});

mongoose.set("strictQuery", false);

const diaryModel = new mongoose.model("diary", diarySchema);

export default diaryModel;
