import { uploader } from "../middleware/multer.js";
import AppRouter from "./app.router.js";
import { 
    uploaderDocuments
} from "../controllers/account.controller.js";

export default class AccountRouter extends AppRouter{
    init(){
        // this.get();
        // this.post();
        this.put("/uploader-documents",
        uploader.fields([{name:"dni"}, {name: "curriculum"}]),
        uploaderDocuments);
        // this.delete();

    };
};