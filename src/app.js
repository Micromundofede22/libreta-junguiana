import express from "express";
import mongoose from "mongoose";
import run from "./run.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import session from "express-session";



const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    app.listen(8080, ()=> console.log("Server up 8080"));

    await mongoose.connect("mongodb+srv://fedefolmer:Fefe1289@cluster0.3ev4n7v.mongodb.net/DBLibreta-junguiana");

    run(app);

} catch (error) {
    console.log(error)
};