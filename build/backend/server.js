"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOprtions = {
    origin: "",
    optionsSuccessStatus: 200
};
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)(corsOprtions));
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(`starting app on: ${port}`);
});
