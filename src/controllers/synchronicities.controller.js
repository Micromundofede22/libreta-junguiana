import { synchronicitiesService } from "../service/service.js";

export const createSynchro = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const {title,body,interpretation,feelings,date,month,year} = req.body;
    if(!title || !body || !feelings || !date || !month  || !year){
      return res.sendRequestError("Faltan datos por completar");
    }
    const file_image= req.file || "";
    const synchronicities_id = user.synchronicities.toString();
    const synchronicities = await synchronicitiesService.getById(
      synchronicities_id
    );

    if (!synchronicities) return res.sendRequestError("Petición incorrecta");
    synchronicities.synchronicity.push({
      title,
      body,
      image_synchro: file_image.filename,
      interpretation,
      feelings,
      date,
      month,
      year
      });
    const result = await synchronicitiesService.update(
      synchronicities_id,
      synchronicities
    );
    res.createdSuccess(result);
  } catch (error) {
    res.sendServerError(error);
  }
};

export const getAllSynchro = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const synchronicities_id = user.synchronicities.toString();
    const synchronicities = await synchronicitiesService.getById(
      synchronicities_id
    );
    if (!synchronicities) return res.sendRequestError("Petición incorrecta");

    synchronicities.synchronicity.length > 0
      ? res.sendSuccess(synchronicities.synchronicity)
      : res.sendSuccess("Diario de sincronicidades vacío");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const getSynchroById = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const synchronicity_id = req.params.sid;
    const synchronicities_id = user.synchronicities.toString();
    const synchronicities = await synchronicitiesService.getById(
      synchronicities_id
    );
    if(!synchronicities) return res.sendRequestError("Petición incorrecta");

    const result = synchronicities.synchronicity.filter(
      (item) => item._id.toString() === synchronicity_id
    );
    result
      ? res.sendSuccess(result)
      : res.sendRequestError("Petición incorrecta");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const findSynchroByQuery= async(req,res) =>{
    try {
        const title= req.query.title;
        const body= req.query.body;
        const year= req.query.year;
        const user= req.user.tokenInfo;
        if (!user) return res.unauthorized("No autorizado. Inicie sesión.");
        const synchronicities_id= user.synchronicities.toString();
        const synchronicities= await synchronicitiesService.getById(synchronicities_id);
        if(!synchronicities) return res.sendRequestError("Petición incorrecta");

        if(title && body && year){
            const result= synchronicities.synchronicity.filter(item=>{
                if(item.title.includes(title) &&
                item.body.includes(body) &&
                item.year === Number(year)){
                    return item
                };
            });
            result.length > 0
                ? res.sendSuccess(result)
                : res.sendRequestError("No hay contenido");            
        }else if(title && body){
            const result= synchronicities.synchronicity.filter(item=>{
                if(item.title.includes(title) &&
                item.body.includes(body)){
                    return item
                };
            });
            result.length > 0
                ? res.sendSuccess(result)
                : res.sendRequestError("No hay contenido");  
        }else if(title || body || year){
            if(title){
                const result= synchronicities.synchronicity.filter(item=>{
                    if(item.title.includes(title)){
                        return item;
                    };
                });
                if(result.length > 0){
                    res.sendSuccess(result);
                }else{
                    res.sendRequestError("No hay contenido");  
                }
                    
         
            };
            if(body){
                const result= synchronicities.synchronicity.filter(item=>{
                    if(item.body.includes(body)){
                        return item;
                    };;
                });
                result.length > 0
                    ? res.sendSuccess(result)
                    : res.sendRequestError("No hay contenido");  
            };
            if(year){
                const result= synchronicities.synchronicity.filter(item=>{
                    if(item.year  === Number(year)){
                        return item;
                    };;
                });
                result.length > 0
                    ? res.sendSuccess(result)
                    : res.sendRequestError("No hay contenido");  
            };
        };
    } catch (error) {
        res.sendServerError(error.message);
    };
};

export const updateSynchro = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const data = req.body;
    const synchronicity_id = req.params.sid;
    const synchronocities_id = user.synchronocities.toString();
    const synchronicities = await synchronicitiesService.getById(
      synchronocities_id
    );

    let quantity_update = 0;
    for (const item of synchronicities.synchronicity) {
      if (item._id.toString() === synchronicity_id) {
        quantity_update = quantity_update + 1;
        item.title = data.title;
        item.body = data.body;
        item.image = data.image;
        item.interpretation = data.interpretation;
        item.feelings = data.feelings;
        item.date = data.date;
        item.month = data.month;
        item.year = data.year;
      }
    }

    if (quantity_update > 0) {
      await synchronicitiesService.update(synchronocities_id, synchronicities);
      res.sendSuccess("sincronicidad modificada");
    } else {
      res.sendRequestError("Petición incorrecta");
    }
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const deleteAllSynchro = async (req, res) => {
  try {
    const user= req.user.tokenInfo;
    if (!user) return res.unauthorized("No autorizado");
    const synchronicities_id= user.synchronicities.toString();
    const synchronicities= await synchronicitiesService.getById(synchronicities_id);
    if(synchronicities.synchronicity.length > 0){
      synchronicities.synchronicity.length = 0;
      synchronicitiesService.update(synchronicities_id, synchronicities);
      res.sendSuccess("Sincronicidades eliminadas");
    }else{
      res.sendSuccess("Usted no posee sincronicidades para eliminar");
    };
  } catch (error) {
    res.sendServerError(error.message);
  };
};

export const deleteByIdSynchro = async (req, res) => {
    try {
      const user= req.user.tokenInfo;
      const synchronicity_id= req.params.sid;
      if (!user) return res.unauthorized("No autorizado");
      const synchronicities_id= user.synchronicities.toString();
      const synchronicities= await synchronicitiesService.getById(synchronicities_id);
      
      if(synchronicities.synchronicity.length > 0){
        let quantity_delete= 0
          for (const [index, item] of synchronicities.synchronicity.entries()) {
              if(item._id.toString() === synchronicity_id){
                synchronicities.synchronicity.splice(index,1);
                quantity_delete= quantity_delete + 1;
              };
          };
        if(quantity_delete > 0){
          synchronicitiesService.update(synchronicities_id, synchronicities);
          res.sendSuccess("Sincronicidad eliminada");
        }else{
          res.sendServerError("Petición incorrecta");
        };
      }else{
        res.sendRequestError("Usted no tiene sincronicidades para eliminar.");
      };
    } catch (error) {
      res.sendServerError(error.message);
    }
  };