import AppRouter from "./app.router.js";
import { handlePolicies } from "../middleware/authorization.js";
import {
    createDiary,
    deleteDiary,
    getAllDiary,
    getByIdDiary,
    updateDiary,
    deletePatient
} from "../controllers/diary.controller.js";


export default class DiaryRouter extends AppRouter{
    init(){
        // this.get("/",getAllDiary);
        this.get("/",handlePolicies(["PSYCHOLOGIST"]),getByIdDiary); //did= diary id
        this.post("/",handlePolicies(["ADMIN"]), createDiary); //admin
        this.put("/:did", updateDiary); 
        this.delete("/:did",handlePolicies(["ADMIN"]), deleteDiary); 
        this.delete("/patient/:pid",handlePolicies(["PSYCHOLOGIST"]), deletePatient);
    };
};