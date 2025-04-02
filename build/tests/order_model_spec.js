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
// @ts-ignore
const database_1 = __importDefault(require("../backend/database"));
describe("Order Model tests", () => {
    const table = order_model_1.default;
    let orderId;
    const testOrder = {
        id: undefined,
        user_id: 1,
        product_id: 1,
        quantity: 5,
        status: "active",
    };
    const user1 = {
        id: undefined,
        username: "userDude",
        firstname: "John",
        lastname: "Smith",
        password: "password"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const conn = yield database_1.default.connect();
        yield conn.query("DELETE FROM orders"); // Clean up the table before running tests
        yield conn.query("INSERT INTO users (firstName, lastName, username, password)  VALUES ('John', 'Doe', 'johndoe123', 'securepassword123')  ");
        yield conn.query("INSERT INTO Products (name, price, category) VALUES ('Wireless Mouse', 29.99, 'Electronics') ");
        conn.release();
    }));
    it("should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield table.create(testOrder);
        expect(createdOrder).toBeDefined();
        expect(createdOrder.user_id).toBe(testOrder.user_id);
        expect(createdOrder.status).toBe(testOrder.status);
        orderId = createdOrder.id;
    }));
    it("should return orders based on user ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_id = 1;
        const order = yield table.show(user_id);
        // @ts-ignore
        expect(order.length).toBeGreaterThan(0);
    }));
    /** ✅ TESTING addProducts METHOD */
    it("should add a product to an order", () => __awaiter(void 0, void 0, void 0, function* () {
        const addedProduct = yield table.addProducts({
            order_id: orderId,
            user_id: 1,
            product_id: 1,
            quantity: 3,
        });
        expect(addedProduct).toBeDefined();
        expect(addedProduct.order_id).toBe(orderId);
        expect(addedProduct.product_id).toBe(1);
        expect(addedProduct.quantity).toBe(3);
    }));
    /** ✅ TESTING showProductByUser METHOD */
    it("should retrieve products for a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_id = 1;
        const products = yield table.showProductByUser(user_id);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].user_id).toBe(user_id);
    }));
});
