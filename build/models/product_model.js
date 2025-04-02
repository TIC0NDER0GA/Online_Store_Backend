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
// @ts-ignore
const database_1 = __importDefault(require("../backend/database"));
const ProductTableModel = {
    // Create a new product
    create: (product) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const result = yield conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }),
    // Get all products
    index: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }),
    // Get a single product by ID
    show: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM products WHERE id = $1";
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }),
};
exports.default = ProductTableModel;
