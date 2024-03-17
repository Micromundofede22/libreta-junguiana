import dayjs from "dayjs";
import {
  diaryService,
  dreamsService,
  synchronicitiesService,
  usersService,
} from "../service/service.js";
import { createHash, generateToken } from "../utils.js";
import { SIGNED_COOKIE_NAME } from "../config/config.js";

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

    if (user_db.role === "user") {
      if (array_documents.length === 1) {
        await usersService.update(user_id, {
          status: "active",
          documents: array_documents,
        });
        return res.sendSuccess(
          "Archivo subido con éxito. Su cuenta ya se encuentra activa para realizar consultas a su psicólogo."
        );
      }
    }

    if (user_db.role === "psychologist") {
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
    }
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const updateInfo = async (req, res) => {
  try {
    const user_id = req.params.uid;
    const user = req.user.tokenInfo;
    if (user_id != user._id.toString())
      return res.forbidden("Acción prohibida");
    const data = req.body;
    const file = req.file;
    // console.log(file)
    if (!data) return res.sendRequestError("Petición incorrecta");
    if (file) {
      await usersService.update(user_id, { imageProfile: file.filename });
    }
    const result = await usersService.update(user_id, data);
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const changeRole = async (req, res) => {
  try {
    const user_id = req.params.uid;
    const newRole = req.body.role;
    const dni = req.file;
    const user = await usersService.getById(user_id);
    if (!user) return res.sendRequestError("Petición incorrecta");
    // console.log(user.documents, typeof user.documents, typeof user.documents === typeof new Array );

    if (newRole === "premium") {
      if(user.role === "premium") return res.sendRequestError(`Usted ya es ${user.role}`);
      if (user.documents.length === 0) {
        if (!dni)
          return res.sendRequestError(
            "Suba el documento dni para realizar este cambio."
          );
        user.documents.push({
          name: dni?.filename,
          reference: dni?.path,
        });
        user.role = "premium";
      }
      if (user.documents.length > 0) {
        user.role = "premium";
      }
      await usersService.update(user_id, user);
      req.user.tokenInfo.role = "premium";
      req.user.tokenInfo.documents = user.documents;

      //actualizamos token para cookie
      const userCurrent = req.user.tokenInfo;
      const token = generateToken(userCurrent);
      return res
        .cookie(SIGNED_COOKIE_NAME, token, { signed: false })
        .sendSuccess(
          `Rol cambiado a ${userCurrent.role} exitosamente. Disfrute los beneficion de ser ${userCurrent.role}`
        );
    };

    if(newRole === "user"){
      if(user.role === "user") return res.sendRequestError(`Usted ya es ${user.role}`);
      user.role= "user";
      await usersService.update(user_id,user);
      req.user.tokenInfo.role= "user";
      const userCurrent=  req.user.tokenInfo;
      const token= generateToken(userCurrent);
      return res
      .cookie(SIGNED_COOKIE_NAME,token,{signed:false})
      .sendSuccess(`Rol cambiado a ${userCurrent.role} exitosamente. Tenga en cuenta que no contará con los beneficios de user PREMIUM`)
    };
  } catch (error) {
    res.sendServerError(error.message);
  };
};

export const offlineUser = async (req, res) => {
  try {
    const users = await usersService.get();
    const currentDate = dayjs();

    let quantity_usersOffline = 0;
    for (const item of users) {
      const last_conection = dayjs(item.last_conection);
      const difference = currentDate.diff(last_conection, "month");
      if (item.status === "active" && difference > 9) {
        item.status = "inactive";
        quantity_usersOffline = quantity_usersOffline + 1;
      }
      await usersService.update(item._id.toString(), item);
    }

    res.sendSuccess(`Se dieron de baja: ${quantity_usersOffline} usuarios`);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.uid;
    const user = await usersService.getById(user_id);
    if (!user) return res.sendRequestError("Petición incorrecta");

    if (user.role === "user") {
      const dreams_id = user.dreams.toString();
      const synchronicities_id = user.synchronicities.toString();
      await dreamsService.delete(dreams_id);
      await synchronicitiesService.delete(synchronicities_id);
    }
    if (user.role === "psychologist") {
      const diary_id = user.diary.toString();
      await diaryService.delete(diary_id);
    }

    await usersService.delete(user_id);
    res.sendSuccess("Usuario eliminado");
  } catch (error) {
    res.sendServerError(error.message);
  }
};
