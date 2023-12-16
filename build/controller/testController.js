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
exports.Deleted = exports.SoftDelete = exports.Search = exports.Update = exports.Delete = exports.Store = exports.Show = exports.Index = void 0;
const User_agent_1 = __importDefault(require("../models/User_agent"));
const mongo = require('mongodb');
const Index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAgents = yield User_agent_1.default.find({ isDeleted: false });
        if (userAgents.length > 0) {
            res.status(200).json({ message: " user agent's has been load succasfuly ",
                "User Agents": userAgents
            });
        }
        else {
            res.status(401).json({ message: " no agents found " });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Index = Index;
const Show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userAgent = yield User_agent_1.default.find({ _id: id, isDeleted: false });
        if (userAgent) {
            res.status(200).json({ message: " user agent has been load succasfuly ",
                "User Agents": userAgent
            });
        }
        else {
            res.status(401).json({ message: " no agent found " });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Show = Show;
const Store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_agent = new User_agent_1.default(req.body);
        let { agent } = user_agent;
        let agentExist = yield User_agent_1.default.findOne({ agent });
        if (agentExist) {
            res.status(200).json({ message: " user agent is alredy exist " });
        }
        else {
            let savedAgent = yield user_agent.save();
            res.status(200).json({ message: " user agent has been created ",
                "user agent": savedAgent });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Store = Store;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userAgent = yield User_agent_1.default.findById(id);
        if (userAgent) {
            yield User_agent_1.default.findByIdAndDelete(id);
            res.status(200).json({ message: ` user with the id: ${id} has been deleted ` });
        }
        else {
            res.status(401).json({ error: `no user agent with the id : ${id}` });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Delete = Delete;
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const userAgent = yield User_agent_1.default.findById(id);
        if (userAgent) {
            const updatedAgent = yield User_agent_1.default.findByIdAndUpdate(id, data, { new: true });
            res.status(200).json({ message: ` user with the id: ${id} has been updated `,
                Updated_user_agent: updatedAgent });
        }
        else {
            res.status(401).json({ error: `no user agent with the id : ${id}` });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Update = Update;
const Search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // We destructure the req.query object to get the page and limit variables from url 
        // const { page = 1, limit = 10 } = req.query;
        var page = 1;
        var limit = 3;
        const userAgents = yield User_agent_1.default.find()
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            // I don't think i need to explain the math here
            .skip((page - 1) * limit)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ createdAt: -1 });
        // Getting the numbers of userAgents  stored in database
        const count = yield User_agent_1.default.countDocuments();
        return res.status(200).json({
            userAgents,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Search = Search;
const SoftDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        const data = { isDeleted: true, deletedAt: date };
        const userAgent = yield User_agent_1.default.findById(id);
        if (userAgent) {
            const updatedAgent = yield User_agent_1.default.findByIdAndUpdate(id, data, { new: true });
            res.status(200).json({ message: ` user with the id: ${id} has been deleted `,
                Updated_user_agent: updatedAgent });
        }
        else {
            res.status(401).json({ error: `no user agent with the id : ${id}` });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.SoftDelete = SoftDelete;
const Deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAgents = yield User_agent_1.default.find({ isDeleted: true });
        if (userAgents.length > 0) {
            res.status(200).json({ message: " deleted user agent's has been load succasfuly ",
                "User Agents": userAgents
            });
        }
        else {
            res.status(401).json({ message: " no deleted agents found " });
        }
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
exports.Deleted = Deleted;
