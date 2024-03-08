import { diaryService, dreamsService, usersService } from "../service/service.js";

export const createDream = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    if (!user) return res.unauthorized("No autorizado. Inicie sesión.");
    const { title, body, own_interpretation, feelings, memory,date,month,year } = req.body;
    const image_file= req.file || "";
    console.log(image_file);
    const dreams_Id = user.dreams.toString();
    const dreams = await dreamsService.getById(dreams_Id);

    const dream = {
      title,
      body,
      dream_image: image_file.filename,
      own_interpretation,
      feelings,
      memory,
      date,
      month,
      year
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

    let dream_delete_quantity = 0;

    for (const [i, item] of dreams.dreams.entries()) {
      if (item._id.toString() === dream_delete_id) {
        // console.log(i, item)
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
        if (!user) res.unauthorized("No autorizado. Inicie sesión.");
        const psychologist_email= user.psychologist;
        if(!psychologist_email) return res.sendRequestError("Seleccione un psicólogo antes de continuar");
        const psychologist= await usersService.getOne({email:psychologist_email});
        if(!psychologist) return res.sendRequestError("Seleccione un psicólogo antes de continuar");
        const psychologist_diary_id= psychologist.diary.toString();
        const diary = await diaryService.getById(psychologist_diary_id);

        const patient= diary.diary.find(item=> item.patient.toString() === user._id);
        // console.log(`patient: ${patient}`);

        if(patient){
         diary.diary.map(item=>{
            if(item.patient.toString() == user._id){
              item.dream.push({_id: dream_interpretation_id});
            }
          })
          await diaryService.update(psychologist_diary_id, diary);
        }else{
            diary.diary.push({
              patient: user._id,
              dreams_id: user.dreams.toString(),
              dream:[
                {_id:dream_interpretation_id}
              ] 
            });
            await diaryService.update(psychologist_diary_id, diary);
          }
        res.sendSuccess("Sueño enviado a su psicólogo, para la interpretación. En 48 hs recibirá respuestas.");
    } catch (error) {
        res.sendServerError(error.message);
    }
};

export const interpretationProfesional= async(req,res) =>{
  try {
    const patient= req.params.patientId;
    const dream_id= req.params.did;
    const data= req.body.profesional_interpretation;
    const user= req.user.tokenInfo;
    if (!user) res.unauthorized("No autorizado. Inicie sesión.");
    const diary_id= user.diary.toString();
    const diary= await diaryService.getByIdAndPopulate(diary_id);
    
    let quantity_interpreted = 0;

    for (const item of diary.diary) {
      if(item.patient._id.toString() == patient ){
       for (const dream of item.dreams_id.dreams) {
        if(dream._id.toString() === dream_id){
          dream.profesional_interpretation= data;
          dream.interpreted= true;
          dream.interpretedBy= `${user.first_name} ${user.last_name}`;
          quantity_interpreted= quantity_interpreted + 1;
        };
        await dreamsService.update(item.patient.dreams.toString(), {dreams: item.dreams_id.dreams});
       }; 
      };
    };
    if(quantity_interpreted > 0){
        return res.sendSuccess("Sueño interpretado con éxito");
      }else{
        res.sendRequestError("Petición incorrecta");
      };
  } catch (error) {
    res.sendServerError(error.message);
  };
};