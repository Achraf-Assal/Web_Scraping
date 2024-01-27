"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ScrapProductController_1 = require("../controller/ScrapProductController");
const RequastLimitMiddleware_1 = __importDefault(require("../middleware/RequastLimitMiddleware"));
const ProductRoute = express_1.default.Router();
ProductRoute.get("/product", (0, RequastLimitMiddleware_1.default)(), ScrapProductController_1.Index);
exports.default = ProductRoute;
