import { diaryService } from "../service/service.js";

export const getAllDiary = () => {
  try {
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const getByIdDiary = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const diary_id = user.diary.toString();
    const diary = await diaryService.getByIdAndPopulate(diary_id);

    const own_diary = [];
    
    diary.diary.forEach((item) => {
      const interpreted_dreams = item.dreams_id.dreams.filter(
        (item) => item.interpretedBy === `${user.first_name} ${user.last_name}`
      );//filtra solo los sueños interpretados por él(psicólogo), los otros sueños del paciente no puede acceder 
      const document_by_patient={
        patient: item.patient,
        dreams: interpreted_dreams
      };
      own_diary.push(document_by_patient); 
    });
    res.sendSuccess(own_diary);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const createDiary = async (req, res) => {
  try {
    const result = await diaryService.create({});
    if (!result) res.sendRequestError("Petición incorrecta");
    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const updateDiary = async (req, res) => {};

export const deleteDiary = async (req, res) => {
  try {
    const diary_id = req.params.did;
    await diaryService.delete(diary_id);
    res.sendSuccess("Diario eliminado");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const deletePatient = async (req, res) => {
  try {
    const user = req.user.tokenInfo;
    const patient_id = req.params.pid;
    const diary_id = user.diary.toString();
    const diary = await diaryService.getByIdAndPopulate(diary_id);

    let quantity_delete = 0;
    for (const item of diary.diary) {
      if (item.patient._id.toString() === patient_id) {
        const index = diary.diary.findIndex(
          (item) => item.patient._id.toString() === patient_id
        );
        if (index > 0) {
          diary.diary.splice(index, 1);
          quantity_delete = quantity_delete + 1;
        }
      }
    }
    if (quantity_delete > 0) {
      const result = await diaryService.update(diary_id, diary);
      return res.sendSuccess(result);
    } else {
      res.sendRequestError("Petición incorrecta");
    }
  } catch (error) {
    res.sendServerError(error.message);
  }
};
