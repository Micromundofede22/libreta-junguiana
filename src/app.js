import express from "express";
import mongoose from "mongoose";


const app= express();

try {
    app.listen(8080, ()=> console.log("Server up 8080"));
    await mongoose.connect("mongodb+srv://fedefolmer:Fefe1289@cluster0.3ev4n7v.mongodb.net/DBLibreta-junguiana");
} catch (error) {
    console.log(error)
}