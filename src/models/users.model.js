import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "psychologist", "admin"],
  },
  psychologist: {type: String, required: false},
  dreams: {type: mongoose.Schema.Types.ObjectId, ref: "dreams"},
  synchronicities: {type: mongoose.Schema.Types.ObjectId, ref: "synchronicities"},
  password: { type: String, required: true },
  verifiedAccount: { type: String, default: "UNVERIFIED" },
  status: { type: String, default: "inactive" },
  service: {type: String, required: true},
  imageProfile: { type: String, required: false },
  last_conection: { type: Date, default: Date.now,required:true },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
    default: [],
  },
});

mongoose.set("strictQuery", false);

const usersModel = new mongoose.model("users", usersSchema);

export default usersModel;
