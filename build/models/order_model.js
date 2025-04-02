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
const OrderTableModel = {
    // Create a new order
    create: (order) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
            const result = yield conn.query(sql, [order.user_id, order.status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }),
    show: (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'active' ";
            const result = yield conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
        }
        return null;
    }),
    addProducts: (order) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "INSERT INTO order_products (order_id, user_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *";
            const result = yield conn.query(sql, [order.order_id, order.user_id, order.product_id, order.quantity]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add product to order ${order.order_id}: ${err}`);
        }
    }),
    showProductByUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "SELECT  op.id AS id, op.user_id, op.product_id, op.quantity, o.status, op.order_id" +
                " FROM Order_Products op INNER JOIN Orders o ON op.order_id = o.id WHERE op.user_id = $1";
            const result = yield conn.query(sql, [userId]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get order: ${err}`);
        }
    })
};
exports.default = OrderTableModel;
