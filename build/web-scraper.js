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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const mongodb_conect_1 = __importDefault(require("./database/mongodb_conect"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = 'https://www.useragents.me//';
        const customUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'; // Replace with your desired User-Agent
        const config = {
            headers: {
                'User-Agent': customUserAgent,
            }
        };
        const response = yield axios_1.default.get(url, config);
        const $ = cheerio_1.default.load(response.data);
        $('.form-control.ua-textarea').each((index, element) => {
            const userAgentTextareaContent = $(element).text();
            if (userAgentTextareaContent) {
                mongodb_conect_1.default.collection('User_agents').insertOne({ "User_agent": userAgentTextareaContent });
            }
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while scraping the website.' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
