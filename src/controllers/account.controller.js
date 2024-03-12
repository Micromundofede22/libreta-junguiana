import {
  diaryService,
  dreamsService,
  synchronicitiesService,
  usersService,
} from "../service/service.js";
import { createHash } from "../utils.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await usersService.get();
    if (!users) return res.sendRequestError("Petición incorrecta");
    res.sendSuccess(users);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const getByIdUser = async (req, res) => {
  try {
    const user_id = req.params.uid;
    const user = await usersService.getById(user_id);
    if (!user) return res.sendRequestError("Usuario no encontrado");
    res.sendSuccess(user);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, sex, role, psychologist } =
      req.body;

    if (!first_name || !last_name || !email || !age || !sex || !role)
      return res.sendRequestError("Faltan campos");

    if (role === "user") {
      if (!psychologist) return res.sendRequestError("Faltan campos");
      const dreams_db = await dreamsService.create({});
      const synchronicities_db = await synchronicitiesService.create({});

      const result = await usersService.create({
        first_name,
        last_name,
        email,
        age,
        sex,
        password: createHash("123user"),
        role,
        psychologist,
        dreams: dreams_db._id,
        synchronicities: synchronicities_db._id,
        service: "local",
        imageProfile: "user.jpg",
      });
      if (!result) res.sendRequestError("Petición incorrecta");
      res.sendSuccess(result);
    }

    if (role === "psychologist") {
      const diary_db = await diaryService.create({});

      const result = await usersService.create({
        first_name,
        last_name,
        email,
        age,
        sex,
        password: createHash("123psycho"),
        role,
        diary: diary_db._id,
        service: "local",
        imageProfile: "psycho.jpg",
      });
      if (!result) res.sendRequestError("Petición incorrecta");
      res.sendSuccess(result);
    }
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const uploaderDocuments = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const user_id = user._id.toString();
    const user_db = await usersService.getById(user_id);
    if (!user_db) return res.sendRequestError("Petición incorrecta");
    const array_documents = user_db.documents;

    const files = req.files;
    // console.log(files);

    if (
      files.dni &&
      !array_documents.some((item) => item.name.includes("dni"))
    ) {
      array_documents.push({
        name: files.dni[0].filename,
        reference: files.dni[0].path,
      });
    } else if (files.dni) {
      for (const item of array_documents) {
        if (item.name.includes("dni")) {
          item.name = files.dni[0].filename;
          item.reference = files.dni[0].path;
        }
      }
    }

    if (
      files.curriculum &&
      !array_documents.some((item) => item.name.includes("curriculum"))
    ) {
      array_documents.push({
        name: files.curriculum[0].filename,
        reference: files.curriculum[0].path,
      });
    } else if (files.curriculum) {
      for (const item of array_documents) {
        if (item.name.includes("curriculum")) {
          item.name = files.curriculum[0].filename;
          item.reference = files.curriculum[0].path;
        }
      }
    }

    if (array_documents.length === 2) {
      await usersService.update(user_id, {
        status: "active",
        documents: array_documents,
      });
      return res.sendSuccess(
        "Archivos subidos con éxito. Su cuenta ya se encuentra activa como profesional."
      );
    }

    await usersService.update(user_id, user_db);
    res.sendSucces("Archivo subido con éxito.");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const updateInfo= async (req,res) => {
    try {
        const user_id= req.params.uid;
        const user= req.user.tokenInfo;
        if(user_id != user._id.toString()) return res.forbidden("Acción prohibida");
        const data= req.body;
        const file= req.file;
        // console.log(file)
        if(!data) return res.sendRequestError("Petición incorrecta");
        if(file){
            await usersService.update(user_id,{imageProfile:file.filename});
        };
        const result= await usersService.update(user_id,data);
        res.
        sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    };
};

export const deleteUser= async(req,res) => {
    try {
        const user_id= req.params.uid;
        const user= await usersService.getById(user_id);
        if(!user) return res.sendRequestError("Petición incorrecta");

        if(user.role=== "user"){
            const dreams_id= user.dreams.toString();
            const synchronicities_id= user.synchronicities.toString();
            await dreamsService.delete(dreams_id);
            await synchronicitiesService.delete(synchronicities_id);
        }
        if(user.role === "psychologist"){
            const diary_id= user.diary.toString();
            await diaryService.delete(diary_id);
        };

        await usersService.delete(user_id);
        res.sendSuccess("Usuario eliminado");
    } catch (error) {
        res.sendServerError(error.message);
    };
};