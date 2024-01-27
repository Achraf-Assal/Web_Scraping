import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import UserAgentRoute from "./routes/TestRout";
import UserRoute from "./routes/UserRouts";
import ProductRoute from "./routes/ScrapProductRout"
import { requireAuth ,checkUser } from "./middleware/AuthMiddleware";
const cookieParser = require('cookie-parser');

const app = express();
// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// config dotenv package to use .env varabels
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


    app.get("*",checkUser);
    // routes
    app.use("/api/user-agent",UserAgentRoute);
    // auth routes
    app.use("/api/user",UserRoute);
    // scrape product routes
    app.use("/api/scrap",ProductRoute);
