"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permission_1 = __importDefault(require("./permission"));
const token_1 = require("./token");
exports.default = {
    isAuth: token_1.isAuth,
    createToken: token_1.createToken,
    permission: permission_1.default,
    decodeToken: token_1.decodeToken,
    isRefressToken: token_1.isRefressToken,
};
//# sourceMappingURL=index.js.map