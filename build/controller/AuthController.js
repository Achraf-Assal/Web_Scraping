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
exports.Login = exports.SignUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const ResponsHandler_1 = require("../handlers/ResponsHandler");
const ValidationHandler_1 = require("../handlers/ValidationHandler");
const TokenHandler_1 = require("../handlers/TokenHandler");
const GlobalVar_1 = require("../GlobalVar");
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password.toLowerCase();
        const user = yield new User_1.default({
            email: email,
            password: password
        });
        let userExist = yield User_1.default.findOne({ email });
        if (userExist) {
            let succasMSG = { message: " user emil is alredy exist " };
            (0, ResponsHandler_1.ErrorHandler)(succasMSG, 401, res);
        }
        else {
            let savedUser = yield user.save();
            let token = (0, TokenHandler_1.HandelTokenCreation)(savedUser.id, 3);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * GlobalVar_1.day * 1000 });
            let succasMSG = { message: " user has been signup ",
                "user": savedUser.email };
            (0, ResponsHandler_1.SuccasHandler)(succasMSG, 200, res);
        }
    }
    catch (error) {
        let err = (0, ValidationHandler_1.ValidationErrorHandler)(error);
        (0, ResponsHandler_1.ErrorHandler)(err, 401, res);
    }
});
exports.SignUp = SignUp;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.login(email, password).then(user => { return user; })
            .catch(err => {
            throw err;
        });
        let token = (0, TokenHandler_1.HandelTokenCreation)(user._id, 3);
        console.log(token);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * GlobalVar_1.day * 1000 });
        let succasMSG = { message: " user has been login ",
            "User": user.email };
        (0, ResponsHandler_1.SuccasHandler)(succasMSG, 200, res);
    }
    catch (error) {
        (0, ResponsHandler_1.ErrorHandler)({
            message: "Authentication failed",
            error: error.error.message || "An unexpected error occurred"
        }, 500, res);
    }
});
exports.Login = Login;
