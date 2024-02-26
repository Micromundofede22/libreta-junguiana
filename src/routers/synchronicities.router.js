import {
  createSynchro,
  deleteSynchro,
  getSynchro,
  updateSynchro,
} from "../controllers/synchronicities.controller.js";
import AppRouter from "./app.router.js";

export default class SynchronicitiesRouter extends AppRouter {
  init() {
    this.post("/", createSynchro);
    this.get("/", getSynchro);
    this.put("/:sid", updateSynchro);
    this.delete("/:sid", deleteSynchro);
  };
};
