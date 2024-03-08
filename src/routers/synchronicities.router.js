import {
  createSynchro,
  deleteAllSynchro,
  getAllSynchro,
  deleteByIdSynchro,
  getSynchroById,
  findSynchroByQuery,
  updateSynchro,
} from "../controllers/synchronicities.controller.js";
import { uploader } from "../middleware/multer.js";
import AppRouter from "./app.router.js";

export default class SynchronicitiesRouter extends AppRouter {
  init() {
    this.post("/",
    uploader.single("image_synchro"),
     createSynchro);
    this.get("/", getAllSynchro);
    this.get("/:sid", getSynchroById);
    this.post("/query/", findSynchroByQuery);
    this.put("/:sid", updateSynchro);
    this.delete("/all/:sid", deleteAllSynchro);
    this.delete("/one/:sid", deleteByIdSynchro);
  };
};
