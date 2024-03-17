import {
  createDream,
  deleteDream,
  getAllDreams,
  getByIdDreams,
  findMemoryDream,
  requestInterpretationDream,
  updateDream,
  deleteAllDreams,
  interpretationProfesional,
} from "../controllers/dreams.controller.js";
import { handlePolicies } from "../middleware/authorization.js";
import { uploader } from "../middleware/multer.js";
import AppRouter from "./app.router.js";

export default class DreamsRouter extends AppRouter {
  init() {
    this.post("/", 
    handlePolicies(["USER","PREMIUM"]), 
    uploader.single("dream_image"),
    createDream);

    this.get("/", handlePolicies(["USER","PREMIUM"]), getAllDreams);

    this.get("/:did", handlePolicies(["USER","PREMIUM"]), getByIdDreams); // did dream id

    this.post("/search", handlePolicies(["USER","PREMIUM"]), findMemoryDream);

    this.put("/:did", handlePolicies(["USER","PREMIUM"]), updateDream);

    this.delete("/", handlePolicies(["USER","PREMIUM"]), deleteAllDreams);

    this.delete("/:did", handlePolicies(["USER","PREMIUM"]), deleteDream);

    this.post(
      "/interpretation/:did",
      handlePolicies(["USER","PREMIUM"]),
      requestInterpretationDream
    ); //enviar peticion de interpretacion. USER= 1 INTERPRETACION DE PRUEBA

    this.put(
      "/interpretation/:patientId/:did",
      handlePolicies(["PSYCHOLOGIST"]),
      interpretationProfesional
    ); // psicologo interpreta
  }
}
