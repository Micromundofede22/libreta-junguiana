import { config } from "dotenv";

config();


export const PORT= process.env.PORT; 

export const MONGO_URI= process.env.MONGO_URI;

export const MONGO_DB_NAME= process.env.MONGO_DB_NAME;

export const JWT_PRIVATE_KEY= process.env.JWT_PRIVATE_KEY;

export const SIGNED_COOKIE_NAME= process.env.SIGNED_COOKIE_NAME;

export const SIGNED_COOKIE_SECRET= process.env.SIGNED_COOKIE_SECRET;

