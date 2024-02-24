import {
    createDream, 
    deleteDream, 
    getDreams, 
    updateDream 
} from "../controllers/dreams.controller.js";
import AppRouter from "./app.router.js";


export default class DreamsRouter extends AppRouter{
    init(){
        this.post("/", createDream);

        this.get("/", getDreams);

        this.put("/:did", updateDream);

        this.delete("/:did", deleteDream);
    };
};