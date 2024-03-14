import multer from "multer";
import { __dirname } from "../utils.js";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "dream_image") {
      cb(null, __dirname + "/public/dreams");
    }
    if (file.fieldname === "image_synchro") {
      cb(null, __dirname + "/public/synchronicities");
    }
    if (file.fieldname === "dni") {
      cb(null, __dirname + "/public/dni"); //solicitar al psicólogo
    }
    if (file.fieldname === "curriculum") {
      cb(null, __dirname + "/public/curriculum"); //solicitar al psicólogo
    }
    if (file.fieldname === "imageProfile") {
      cb(null, __dirname + "/public/profile");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const uploader = multer({
  storage: storage,
  limits:{fileSize: 1000000}, //máximo 1mb
  fileFilter: function (req, file, cb) {

    //tamaño
    const fileSize= parseInt(req.headers['content-length']);
    // console.log(req.headers);
    // console.log(fileSize);
    if(fileSize  < 1024){
      return cb (new Error("Archivo posiblemente dañado, cargue archivo con contenido."));
    };

    //extensión
    if(file.fieldname === "imageProfile"){
      if (path.extname(file.originalname) !== (".png" && ".jpg")) {
        return cb(new Error("Extensión incompatible. Cargue archivo .png o .jpg"));
      };
      cb(null, true);
    };
    if(file.fieldname === "curriculum"){
      if (path.extname(file.originalname) !== ".pdf") {
        return cb(new Error("Extensión incompatible. Cargue archivo .pdf"));
      };
      cb(null, true);
    };

    cb(null,true);
  },
});
