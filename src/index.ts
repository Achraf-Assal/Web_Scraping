import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import route from "./routes/TestRout";

const app = express();

app.use(bodyParser.json());
dotenv.config();

const MongoUrl = process.env.MONGO_DB_URL as String || 3000;
const PORT = process.env.PORT as unknown as Number;

mongoose.connect(MongoUrl as string)
    .then(()=>{
      console.log("Connexion reussi")
      app.listen(PORT,()=>{
        console.log(`Server runing on port: ${PORT}`)
      })
    })
    .catch((err: any)=>console.log(err))


    app.use("/api/user",route)
