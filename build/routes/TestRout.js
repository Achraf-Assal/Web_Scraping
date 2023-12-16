"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = require("../controller/testController");
const route = express_1.default.Router();
// Users_Agent
route.route("/user-agent")
    .get(testController_1.Index)
    .post(testController_1.Store);
route.route("/user-agent/:id")
    .get(testController_1.Show)
    .put(testController_1.Update)
    .delete(testController_1.Delete);
// Search
route.get("/search-users-agen", testController_1.Search);
// Soft Delete
route.put("/soft-delete/users-agen/:id", testController_1.SoftDelete);
// Deleted
route.get("/soft-delete/users-agent", testController_1.Deleted);
exports.default = route;
