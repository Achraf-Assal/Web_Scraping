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
const UserRouts_1 = __importDefault(require("./routes/UserRouts"));
const ScrapProductRout_1 = __importDefault(require("./routes/ScrapProductRout"));
const AuthMiddleware_1 = require("./middleware/AuthMiddleware");
const cookieParser = require('cookie-parser');
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(cookieParser());
// config dotenv package to use .env varabels
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
app.get("*", AuthMiddleware_1.checkUser);
// routes
app.use("/api/user-agent", TestRout_1.default);
// auth routes
app.use("/api/user", UserRouts_1.default);
// scrape product routes
app.use("/api/scrap", ScrapProductRout_1.default);
