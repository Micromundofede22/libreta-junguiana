import multer from "multer";
import { __dirname } from "../utils.js";
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "dream_image") {
      cb(null, __dirname + "/public/dreams");
    };
    if(file.fieldname === "image_synchro"){
        cb(null, __dirname + "/public/synchronicities");
    };
    if(file.fieldname === "dni"){
        cb(null, __dirname + "/public/dni"); //solicitar al psicólogo
    };
    if(file.fieldname === "curriculum"){
        cb(null, __dirname + "/public/curriculum"); //solicitar al psicólogo
    };
    if(file.fieldname === "imageProfile"){
        cb(null, __dirname + "/public/profile"); 
    };
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext= path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const uploader = multer({ storage });