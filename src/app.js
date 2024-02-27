import express from "express";
import mongoose from "mongoose";
import run from "./run.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { 
    MONGO_DB_NAME, 
    MONGO_URI, 
    PORT, 
    SIGNED_COOKIE_SECRET 
} from "./config/config.js";



const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SIGNED_COOKIE_SECRET));


//PASSPORT
app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


try {
    app.listen(PORT, ()=> console.log(`Server up ${PORT} `));

    await mongoose.connect(`${MONGO_URI}${MONGO_DB_NAME}`);

    run(app);

} catch (error) {
    console.log(error)
};