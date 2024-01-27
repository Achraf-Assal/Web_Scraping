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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomUseragent = exports.scrapRequast = exports.getRandomInt = exports.header = void 0;
const header = (customUserAgent) => {
    const config = {
        headers: {
            'User-Agent': customUserAgent,
        }
    };
    return config;
};
exports.header = header;
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.getRandomInt = getRandomInt;
const scrapRequast = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.scrapRequast = scrapRequast;
const getRandomUseragent = (counter, User_agent, req, duration) => __awaiter(void 0, void 0, void 0, function* () {
    const url = require('url');
    var userAgent = req.get('User-Agent').toString();
    const query = url.parse(req.url, true).query;
    if (Boolean(query.use_agent)) {
        if (counter < duration) {
            counter++;
        }
        else {
            counter = 0;
            let lungth = yield User_agent.collection.count();
            let user_agent_index = (0, exports.getRandomInt)(0, lungth);
            let user_agent = yield User_agent.find({ number: user_agent_index });
            userAgent = user_agent.agent;
        }
    }
    return userAgent;
});
exports.getRandomUseragent = getRandomUseragent;
