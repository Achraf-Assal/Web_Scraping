"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_agent_schema = new mongoose_1.default.Schema({
    agent: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    }
});
exports.default = mongoose_1.default.model("User_agents", User_agent_schema);
