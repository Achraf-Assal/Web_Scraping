const express = require('express');
import dotenv from 'dotenv';
import { Db } from 'mongodb';
dotenv.config();

// Create a new MongoClient
const mongoDBURL = process.env.MONGO_DB_URL as string;

const mongoose= require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Web_Scraper")
    .then(()=>{
      console.log("Connexion reussi")
    })
    .catch((err: any)=>console.log(err))


export default mongoose;