import { register } from "../controllers/session.controller.js";
import AppRouter from "./app.router.js";


export default class SessionRouter extends AppRouter{
    init(){
        this.post("/register", register);
    }
}