"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandelTokenCreation = void 0;
const GlobalVar_1 = require("../GlobalVar");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.TOKEN_KEY;
const HandelTokenCreation = (id, duration) => {
    const maxAge = duration * GlobalVar_1.day;
    return jwt.sign({ id }, secretKey, { expiresIn: maxAge });
};
exports.HandelTokenCreation = HandelTokenCreation;
