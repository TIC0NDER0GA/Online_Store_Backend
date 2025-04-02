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
const order_model_1 = __importDefault(require("../models/order_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const ordersTable = order_model_1.default;
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const someOrder = {
            user_id: 1,
            status: "Active",
        };
        const inputOrder = {
            user_id: filters.user_id,
            status: "Active",
        };
        const order = yield ordersTable.create(someOrder);
        res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, filters } = req.body;
    try {
        const userId = filters.user_id;
        // @ts-ignore
        const order = yield ordersTable.showProductByUser(userId);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, filters } = req.body;
    try {
        const someOrder = {
            user_id: 1,
            status: "Active",
            quantity: 4,
            order_id: 1,
            product_id: 1
        };
        const inputOrder = {
            user_id: filters.user_id,
            status: "Active",
            quantity: filters.quantity,
            order_id: filters.order_id,
            product_id: filters.product_id
        };
        // @ts-ignore
        const order = yield ordersTable.addProducts(someOrder);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const orderRoutes = (app) => {
    app.post('/orders', create);
    app.get('/orders/:id', show);
    app.post('/orders/:id/products', addProducts);
};
exports.default = orderRoutes;
