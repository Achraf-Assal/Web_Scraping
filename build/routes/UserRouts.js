"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const UserRoute = express_1.default.Router();
UserRoute.post("/signup", AuthController_1.SignUp);
UserRoute.post("/login", AuthController_1.Login);
UserRoute.get("/logout", AuthController_1.Logout);
exports.default = UserRoute;
