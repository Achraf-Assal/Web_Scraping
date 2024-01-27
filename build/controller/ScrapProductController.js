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
exports.Index = void 0;
const User_agent_1 = __importDefault(require("../models/User_agent"));
const user_agents_1 = require("../helpers/user_agents");
const ResponsHandler_1 = require("../handlers/ResponsHandler");
const scrap_functions_1 = require("../helpers/scrap_functions");
const axios = require('axios');
const mongo = require('mongodb');
var use_agent = true;
var counter = 0;
const url = 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=ardoino&_sacat=0';
const Index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_Agent = "";
        (0, user_agents_1.getRandomUseragent)(counter, User_agent_1.default, req, 3)
            .then((result) => {
            user_Agent = result;
        })
            .catch((error) => {
            console.error('Error:', error);
        });
        let config = (0, user_agents_1.header)(user_Agent);
        const response = yield axios.get(url, config);
        let imgUrls = yield (0, scrap_functions_1.GetProductImg)(response);
        console.log(imgUrls);
        let succasMSG = { message: "data hase benn load",
            "image urls": imgUrls };
        (0, ResponsHandler_1.SuccasHandler)(succasMSG, 200, res);
    }
    catch (error) {
        (0, ResponsHandler_1.ErrorHandler)({
            message: "Scraping failed",
            error: error.error.message || "An unexpected error occurred"
        }, 500, res);
    }
});
exports.Index = Index;
