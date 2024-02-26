import {
    createDream, 
    deleteDream, 
    getDreams, 
    updateDream 
} from "../controllers/dreams.controller.js";
import { handlePolicies } from "../middleware/authorization.js";
import AppRouter from "./app.router.js";


export default class DreamsRouter extends AppRouter{
    init(){
        this.post("/", handlePolicies(["USER"]), createDream);

        this.get("/", getDreams);

        this.put("/:did", updateDream);

        this.delete("/:did", deleteDream);
    };
};