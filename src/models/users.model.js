import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true,get: obfuscate },
 
  age: [
    {
      type: Number,
      required: true,
      min: [18, "Usted es menor de edad. Mínimo 18, usted tiene {VALUE}"], //value es reemplazado por el valor incorecto
      max: 99,
    },
  ],
  sex: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "premium", "psychologist", "admin"],
  },
  numberInterpretation: {
    type: Number,
    default: 0,
  },
  psychologist: { type: String, required: false },
  dreams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dreams",
    required: false,
  },
  synchronicities: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "synchronicities",
    required: false,
  },
  diary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "diary",
    required: false,
  },
  // password: [{ //minimos y maximos en cadenas, aca no ocupo porque password es un token larguisimo
  //   type: String,
  //   required: true,
  //   minLength: [8, "Contraseña muy corta, mínimo 8 caracteres"],
  //   maxLength: [40, "Contraseña demasiado extensa, máximo 30 caracteres"]
  // }],
  password: {
    type: String,
    required: true,
  },
  verifiedAccount: { type: String, default: "UNVERIFIED" },
  status: { type: String, default: "inactive" },
  service: { type: String, required: true },
  imageProfile: { type: String, required: false },
  last_conection: { type: Date, default: Date.now, required: true },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
    default: [],
  }
},
{timestamps:true} //agrega dos propiedades: createdAt, updateAt.
);

//getters: traen los datos de mongodb y los modifica antes de mostrarlos (no modifica la db)
function obfuscate(email) {
  const separatorIndex = email.indexOf('@');
  if (separatorIndex < 3) {
    // 'ab@gmail.com' -> '**@gmail.com'
    return email.slice(0, separatorIndex).replace(/./g, '*') +
      email.slice(separatorIndex);
  }
  // 'test42@gmail.com' -> 'te****@gmail.com'
  return email.slice(0, 2) +
    email.slice(2, separatorIndex).replace(/./g, '*') +
    email.slice(separatorIndex);
};

mongoose.set('toJSON', { getters: true }); //para q json de la respuesta pueda leer el getter
mongoose.set("strictQuery", false);

const usersModel = new mongoose.model("users", usersSchema);

export default usersModel;
