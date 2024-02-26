import passport from "passport";
import { 
    failLogin,
    failRegister, 
    login, 
    logout, 
    register 
} from "../controllers/session.controller.js";
import AppRouter from "./app.router.js";
import { passportCall } from "../middleware/passportCall.js";


export default class SessionRouter extends AppRouter{
    init(){
        //REGISTER
        this.post(
            "/register", 
            passport.authenticate("registerPassport", 
            {failureRedirect: "/api/session/fail-register"}),
            register);

        this.get("/fail-register", failRegister);

        //LOGIN
        this.post("/login",
        passport.authenticate("loginPassport", 
        {failureRedirect: "/api/session/fail-login"}),
        login
        )

        this.get("/fail-login", failLogin);

        //LOGOUT
        this.get("/logout", passportCall("jwt") , logout);  //arreglar !!!!!!!!!!!!!!!!!!!!

    }
}