"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalVar_1 = require("../GlobalVar");
const rateLimitMiddleware = () => (req, res, next) => {
    const ip = req.ip; // You might need to adjust this based on your application's structure
    // Check if the user made a request within the last 60 seconds
    if (GlobalVar_1.lastRequestTimes[ip] && Date.now() - GlobalVar_1.lastRequestTimes[ip] < 10000) {
        return res.status(429).json({ error: 'Too Many Requests' });
    }
    // Record the time of the current request
    GlobalVar_1.lastRequestTimes[ip] = Date.now();
    // Continue with the request
    next();
};
exports.default = rateLimitMiddleware;
