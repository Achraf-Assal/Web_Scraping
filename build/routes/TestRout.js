"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserAgentController_1 = require("../controller/UserAgentController");
const UserAgentRoute = express_1.default.Router();
// Users_Agent
UserAgentRoute.route("/")
    .get(UserAgentController_1.Index)
    .post(UserAgentController_1.Store);
UserAgentRoute.route("/:id")
    .get(UserAgentController_1.Show)
    .put(UserAgentController_1.Update)
    .delete(UserAgentController_1.Delete);
// Search
UserAgentRoute.get("/search", UserAgentController_1.Search);
// Soft Delete
UserAgentRoute.put("/soft-delete/:id", UserAgentController_1.SoftDelete);
// Deleted
UserAgentRoute.get("/soft-delete", UserAgentController_1.Deleted);
exports.default = UserAgentRoute;
