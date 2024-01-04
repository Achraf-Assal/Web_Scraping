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
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const CompareHandler_1 = require("../handlers/CompareHandler");
const bcrypt = require('bcrypt');
const User_schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        require: [true, 'email is required to signup'],
        unique: true,
        validate: [isEmail_1.default, 'Please enter a valid email addres ']
    },
    password: {
        type: String,
        require: [true, 'password is required to signup'],
        minLength: [8, 'the minmal length for password is 8 character']
    },
    isDeleted: {
        type: Boolean
    },
    deletedAt: {
        type: Date
    }
});
// User_schema.post('save',(docs:any,next:any)=>{
//     console.log('user has been saved',docs);
//     next();
// })
User_schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt();
        this.password = yield bcrypt.hash(this.password, salt);
        next();
    });
});
User_schema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({ email });
            (0, CompareHandler_1.comparePasswor)(password, user).then((user) => {
                resolve(user);
            }).catch((err) => {
                reject({
                    error: err.error,
                    statusCode: 401
                });
            });
        }));
    });
};
const User = mongoose_1.default.model('User', User_schema);
exports.default = User;
