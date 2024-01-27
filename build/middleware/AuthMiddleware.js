"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.requireAuth = void 0;
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User_1 = __importDefault(require("../models/User"));
dotenv.config();
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretKey = process.env.TOKEN_KEY;
        const token = req.cookies.jwt;
        if (token) {
            yield jwt.verify(token, "Achraf_BodyGard7-I-WANT/4_WS+9568", (err, decodedToken) => {
                if (err) {
                    res.redirect('/login');
                }
                else {
                    next();
                }
            });
        }
        else {
            res.redirect('/');
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.requireAuth = requireAuth;
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretKey = process.env.TOKEN_KEY;
        const token = req.cookies.jwt;
        if (token) {
            yield jwt.verify(token, secretKey, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.locals.user = null;
                    next();
                }
                else {
                    let user = yield User_1.default.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            }));
        }
        else {
            res.locals.user = null;
            next();
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkUser = checkUser;
