import express from "express";
import mongoose from "mongoose";
import run from "./run.js";



const app= express();

try {
    app.listen(8080, ()=> console.log("Server up 8080"));

    await mongoose.connect("mongodb+srv://fedefolmer:Fefe1289@cluster0.3ev4n7v.mongodb.net/DBLibreta-junguiana");

    run(app);

} catch (error) {
    console.log(error)
};