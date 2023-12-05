"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const TestRout_1 = __importDefault(require("./routes/TestRout"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
dotenv_1.default.config();
const MongoUrl = process.env.MONGO_DB_URL || 3000;
const PORT = process.env.PORT;
mongoose_1.default.connect(MongoUrl)
    .then(() => {
    console.log("Connexion reussi");
    app.listen(PORT, () => {
        console.log(`Server runing on port: ${PORT}`);
    });
})
    .catch((err) => console.log(err));
app.use("/api/user", TestRout_1.default);
