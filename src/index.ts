import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import UserAgentRoute from "./routes/TestRout";
import UserRoute from "./routes/UserRouts";
import { requireAuth } from "./middleware/AuthMiddleware";
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// config dotenv package to use .env varabels
dotenv.config();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

    // routes
    app.get('/', (req, res) => res.render('home'));
    app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
    app.get('/login',(req, res) => res.render('login'));
    app.get('/signup',(req, res) => res.render('signup'));

    app.use("/api/user-agent",UserAgentRoute);
    app.use("/api/user",UserRoute);
