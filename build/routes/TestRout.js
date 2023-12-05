"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = require("../controller/testController");
const route = express_1.default.Router();
route.get("/userAgent", testController_1.Index);
route.post("/userAgent", testController_1.Store);
route.get("/userAgent/:id", testController_1.Show);
route.delete("/userAgent/:id", testController_1.Delete);
route.put("/userAgent/:id", testController_1.Update);
route.get("/SearchUserAgent", testController_1.Search);
exports.default = route;
