import passport from "passport";
import { 
    failRegister, 
    register 
} from "../controllers/session.controller.js";
import AppRouter from "./app.router.js";


export default class SessionRouter extends AppRouter{
    init(){
        this.post(
            "/register", 
            passport.authenticate("registerPassport", 
            {failureRedirect: "/api/session/fail-register"}),
            register);

        this.get("/fail-register", failRegister);

    }
}