import { dreamsService } from "../service/service.js";

export const createDream = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    if (!user) return res.unauthorized("No autorizado. Inicie sesión.");
    const { title, body, image, interpretation, feelings, memory } = req.body;
    const dreams_Id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_Id);

    const dream = {
      title,
      body,
      image,
      interpretation,
      feelings,
      memory,
    };

    dreams.dreams.push(dream);
    await dreamsService.update(dreams_Id, dreams);
    res.sendSuccess("Sueño registrado");
  } catch (error) {
    res.sendServerError(error);
  }
};

export const getAllDreams = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    if (!user) return res.sendRequestError("No autorizado. Inicie sesión.");
    const dreams_id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_id);
    if (!dreams) return res.sendRequestError("Petición incorrecta");
    const result = dreams.dreams;
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const getByIdDreams = async (req, res) => {
  try {
    const dream_id = req.params.did;
    const user = req.user.tokenInfo;
    if (!user) return res.unauthorized("No autorizado. Inicie sesión.");
    const dreams_id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_id);
    const dream = dreams.dreams.find(
      (item) => item._id.toString() === dream_id
    );

    res.sendSuccess(dream);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const findMemoryDream = async (req, res) => {
  try {
    const memory = req.query.memory;
    const title = req.query.title;
    const body = req.query.body;

    const user = req.user.tokenInfo;
    if (!user) return res.unauthorized("No autorizado. Inicie sesión.");
    const dreams_id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_id);

    if (memory && title && body) {
      const result = dreams.dreams.filter(
        (item) =>
          item.memory.includes(memory) &&
          item.title.includes(title) &&
          item.body.includes(body)
      );
      if (result.length == 0) return res.sendSuccess("No hay contenido");
      return res.sendSuccess(result);
    } else if (memory && title) {
      const result = dreams.dreams.filter(
        (item) => item.memory.includes(memory) && item.title.includes(title)
      );
      if (result.length == 0) return res.sendSuccess("No hay contenido");
      return res.sendSuccess(result);
    } else if (title || memory || body) {
      if (title) {
        const result = dreams.dreams.filter((item) =>
          item.title.includes(title)
        );
        if (result.length == 0) return res.sendSuccess("No hay contenido");
        return res.sendSuccess(result);
      }
      if (memory) {
        const result = dreams.dreams.filter((item) =>
          item.memory.includes(memory)
        );
        if (result.length == 0) return res.sendSuccess("No hay contenido");
        return res.sendSuccess(result);
      } else if (body) {
        const result = dreams.dreams.filter((item) => item.body.includes(body));
        if (result.length == 0) return res.sendSuccess("No hay contenido");
        return res.sendSuccess(result);
      } 
    }else {
        return res.sendRequestError("Petición incorrecta");
      }
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const updateDream = async (req, res) => {
  try {
    const dream_update_id = req.params.did;
    const data = req.body;
    const user = req.user.tokenInfo;
    if (!user) return res.unauthorized("No autorizado. Inicie sesión.");
    const dreams_id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_id);
    if (!dreams) return res.sendRequestError("Petición incorrecta");

    let quantity_edit = 0;
    dreams.dreams.forEach((item) => {
      if (item._id.toString() === dream_update_id) {
        quantity_edit = quantity_edit + 1;
        item.title = data?.title;
        item.body = data?.body;
        item.interpretation = data?.interpretation;
        item.feelings = data?.feelings;
        item.memory = data?.memory;
      }
    });
    if (quantity_edit === 0)
      return res.sendRequestError("No se encontró el sueño para editar");

    await dreamsService.update(dreams_id, dreams);

    res.sendSuccess("Sueño editado");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const deleteDream = async (req, res) => {
  try {
    const dream_delete_id = req.params.did;
    const user = req.user.tokenInfo;
    if (!user) res.unauthorized("No autorizado. Inicie sesión.");
    const dreams_id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_id);

    const dream_delete_quantity = 0;

    for (const [i, item] of dreams.dreams.entries()) {
      if (item._id.toString() === dream_delete_id) {
        dreams.dreams.splice(i, 1);
        dream_delete_quantity = dream_delete_quantity + 1;
      }
    }
    if (dream_delete_quantity === 0)
      return res.sendRequestError("Petición incorrecta, sueño no encontrado.");
    await dreamsService.update(dreams_id, dreams);
    res.sendSuccess("Sueño eliminado");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const deleteAllDreams = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    if (!user) res.unauthorized("No autorizado. Inicie sesión.");
    const dreams_id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_id);
    if (dreams.dreams.length === 0)
      return res.sendRequestError("No hay sueños por eliminar");
    dreams.dreams.length = 0;
    await dreamsService.update(dreams_id, dreams);
    res.sendSuccess("Sueños eliminados");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const requestInterpretationDream= async(req,res) => {
    try {
        const dream_interpretation_id = req.params.did;
        const user = req.user.tokenInfo;
        const dreams_id = user.dreams.toString();
        const dreams= await dreamsService.getById(dreams_id);
       

        dreams.dreams
    } catch (error) {
        
    }
}