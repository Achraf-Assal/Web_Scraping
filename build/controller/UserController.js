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
exports.SignUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const ResponsHandler_1 = require("../handlers/ResponsHandler");
const ValidationHandler_1 = require("../handlers/ValidationHandler");
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
            (0, ResponsHandler_1.SuccasHandler)(succasMSG, 200, res);
        }
        else {
            let savedUser = yield user.save();
            let succasMSG = { message: " user has been signup ",
                "user": savedUser.email };
            (0, ResponsHandler_1.SuccasHandler)(succasMSG, 200, res);
        }
    }
    catch (error) {
        let err = (0, ValidationHandler_1.ValidationErrorHandler)(error);
        let errorMSG = { "message": "internal server error",
            "error": err };
        (0, ResponsHandler_1.ErrorHandler)(errorMSG, 500, res);
    }
});
exports.SignUp = SignUp;
