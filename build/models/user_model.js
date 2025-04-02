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
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const { BCRPYT, SALT_ROUNDS } = process.env;
const pepper = BCRPYT;
const saltRounds = SALT_ROUNDS;
const UserTableModel = {
    create: (u) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const result = yield conn.query(sql, [u.firstname, u.lastname, u.username, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Error could not create new user: ${err}`);
        }
    }),
    authenticate: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const conn = yield database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';
        // @ts-ignore
        const result = yield conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }),
    // Get a single user by ID
    show: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id = $1";
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }),
    index: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const conn = yield database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    })
};
exports.default = UserTableModel;
