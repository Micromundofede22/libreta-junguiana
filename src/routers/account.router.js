import { uploader } from "../middleware/multer.js";
import AppRouter from "./app.router.js";
import {
  getAllUser,
  getByIdUser,
  createUser,
  uploaderDocuments,
  updateInfo,
  deleteUser,
} from "../controllers/account.controller.js";
import { handlePolicies } from "../middleware/authorization.js";

export default class AccountRouter extends AppRouter {
  init() {
    this.get("/", handlePolicies(["ADMIN"]), getAllUser);
    this.get("/:uid", handlePolicies(["ADMIN"]), getByIdUser);
    this.post("/", handlePolicies(["ADMIN"]), createUser);
    this.put(
      "/uploader-documents",
      handlePolicies(["USER","PSYCHOLOGIST"]),
      uploader.fields([{ name: "dni" }, { name: "curriculum" }]),
      uploaderDocuments
    ); //activar cuenta subiendo archivos
    this.put("/update-info/:uid",
     uploader.single("imageProfile"),
     updateInfo)
    this.delete("/:uid", handlePolicies(["ADMIN"]), deleteUser);
  }
}
