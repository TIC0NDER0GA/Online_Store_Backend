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
// @ts-ignore
const database_1 = __importDefault(require("../backend/database"));
describe(" User Model tests", () => {
    const table = user_model_1.default;
    let userId;
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
        yield conn.query("DELETE FROM users"); // Clean up the table before running tests
        conn.release();
    }));
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield table.create(user1);
        expect(createdUser).toBeDefined();
        // @ts-ignore
        expect(createdUser.firstname).toBe(user1.firstname);
        // @ts-ignore
        expect(createdUser.lastname).toBe(user1.lastname);
        // @ts-ignore
        userId = createdUser.id;
    }));
    it("should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield table.index();
        expect(users.length).toBeGreaterThan(0);
    }));
    it("should return a single user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield table.show(userId);
        expect(user).toBeDefined();
        expect(user.id).toBe(userId);
    }));
});
