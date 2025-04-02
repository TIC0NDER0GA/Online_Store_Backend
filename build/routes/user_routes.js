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
const user_model_1 = __importDefault(require("../models/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usersTable = user_model_1.default;
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, filters, token } = req.body;
    try {
        const someUser = {
            id: 1,
            username: "User",
            firstname: "First",
            lastname: "Last",
            password: "password"
        };
        const inputUser = {
            username: filters.username,
            firstname: filters.lastname,
            lastname: filters.lastname,
            password: filters.password
        };
        const newUser = yield usersTable.create(someUser);
        // @ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: newUser }, TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, filters, token } = req.body;
    try {
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const userId = filters.id;
        const user = yield usersTable.show(userId);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, filters } = req.body;
    try {
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const users = yield usersTable.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const userRoutes = (app) => {
    app.post('/users', create);
    app.get('/users', index);
    app.get('/users/:id', show);
};
exports.default = userRoutes;
