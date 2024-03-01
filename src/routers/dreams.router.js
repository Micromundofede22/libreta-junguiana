import {
    createDream, 
    deleteDream, 
    getAllDreams,
    getByIdDreams, 
    findMemoryDream,
    requestInterpretationDream,
    updateDream,
    deleteAllDreams 
} from "../controllers/dreams.controller.js";
import { handlePolicies } from "../middleware/authorization.js";
import AppRouter from "./app.router.js";


export default class DreamsRouter extends AppRouter{
    init(){
        this.post("/", handlePolicies(["USER"]), createDream);

        this.get("/", getAllDreams);

        this.get("/:did", getByIdDreams); // did dream id

        this.post("/search", findMemoryDream);
        
        this.put("/:did", updateDream);
        
        this.delete("/:did", deleteDream);
        
        this.delete("/", deleteAllDreams);

        this.post("/interpretation/:did", requestInterpretationDream);
    };
};