"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POST_DATABASE, POST_HOST, POST_USER, POST_PASSWORD, ENV, POST_DATABASE_TEST } = process.env;
let env = ENV;
let client;
switch (env.trim()) {
    case "build":
        client = new pg_1.Pool({
            host: POST_HOST,
            database: POST_DATABASE,
            user: POST_USER,
            password: POST_PASSWORD
        });
        break;
    case "test":
        client = new pg_1.Pool({
            host: POST_HOST,
            database: POST_DATABASE_TEST,
            user: POST_USER,
            password: POST_PASSWORD
        });
        break;
}
exports.default = client;
