"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new MongoClient
const mongoDBURL = process.env.MONGO_DB_URL;
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Web_Scraper")
    .then(() => {
    console.log("Connexion reussi");
})
    .catch((err) => console.log(err));
exports.default = mongoose;
