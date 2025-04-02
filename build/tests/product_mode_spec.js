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
// @ts-ignore
const database_1 = __importDefault(require("../backend/database"));
describe("Product Model tests", () => {
    const table = product_model_1.default;
    let productId;
    const testProduct1 = {
        id: undefined,
        name: "Orange",
        price: 3.99,
        category: "fruit"
    };
    const testProduct2 = {
        id: undefined,
        name: "Strawberry",
        price: 1.50,
        category: "fruit"
    };
    const testProduct3 = {
        id: undefined,
        name: "GameBoyAdvance",
        price: 100.00,
        category: "electronics"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const conn = yield database_1.default.connect();
        yield conn.query("DELETE FROM products"); // Clean up the table before running tests
        conn.release();
    }));
    it("should create a new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield table.create(testProduct1);
        expect(createdProduct).toBeDefined();
        expect(createdProduct.name).toBe(testProduct1.name);
        expect(createdProduct.price).toBe(testProduct1.price);
        productId = createdProduct.id;
    }));
    it("should return a list of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield table.index();
        yield table.create(testProduct2);
        yield table.create(testProduct3);
        expect(products.length).toBeGreaterThan(0);
    }));
    it("should return a single product by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield table.show(productId);
        expect(product).toBeDefined();
        expect(product.id).toBe(productId);
    }));
});
