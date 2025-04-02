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
const product_model_1 = __importDefault(require("../models/product_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const productsTable = product_model_1.default;
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
        const someProduct = {
            id: 1,
            name: "Orange",
            price: 3.99,
            category: "Fruit"
        };
        const inputProduct = {
            name: filters.name,
            price: filters.price,
            category: filters.category
        };
        const product = yield productsTable.create(someProduct);
        res.json(product);
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
        const productId = filters.id;
        const product = yield productsTable.show(productId);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, filters } = req.body;
    try {
        const products = yield productsTable.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const productRoutes = (app) => {
    app.post('/products', create);
    app.get('/products', index);
    app.get('/products/:id', show);
};
exports.default = productRoutes;
