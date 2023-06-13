import express  from "express";
import {Connection} from "./database/db.js";
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

dotenv.config();

const app=express();


app.use(cors());

app.use(bodyParser.json({limit:"100mb",extended:true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:"100mb",extended:true}));
app.use(express.json());




const port=8000;
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const PORT=8000;

Connection(USERNAME,PASSWORD);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




app.listen(PORT,()=>console.log(`server running on port ${PORT}`));









//yjrpi5ait3ZKLjn4