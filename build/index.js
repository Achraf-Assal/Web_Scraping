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
const AuthMiddleware_1 = require("./middleware/AuthMiddleware");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(cookieParser());
// config dotenv package to use .env varabels
dotenv_1.default.config();
// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express_1.default.static(path.join(__dirname, 'public')));
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
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', AuthMiddleware_1.requireAuth, (req, res) => res.render('smoothies'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.use("/api/user-agent", TestRout_1.default);
app.use("/api/user", UserRouts_1.default);
