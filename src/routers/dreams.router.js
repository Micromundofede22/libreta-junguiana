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
    handlePolicies(["USER"]), 
    uploader.single("dream_image"),
    createDream);

    this.get("/", handlePolicies(["USER"]), getAllDreams);

    this.get("/:did", handlePolicies(["USER"]), getByIdDreams); // did dream id

    this.post("/search", handlePolicies(["USER"]), findMemoryDream);

    this.put("/:did", handlePolicies(["USER"]), updateDream);

    this.delete("/", handlePolicies(["USER"]), deleteAllDreams);

    this.delete("/:did", handlePolicies(["USER"]), deleteDream);

    this.post(
      "/interpretation/:did",
      handlePolicies(["USER"]),
      requestInterpretationDream
    ); //enviar peticion de interpretacion

    this.put(
      "/interpretation/:patientId/:did",
      handlePolicies(["PSYCHOLOGIST"]),
      interpretationProfesional
    ); // psicologo interpreta
  }
}
