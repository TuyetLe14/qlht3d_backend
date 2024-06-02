"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const express_1 = __importDefault(require("express"));
const loaders_1 = __importDefault(require("./loaders"));
dotenv_safe_1.default.config();
require("../jwk.dev.json");
require("../jwk.production.json");
require("../config/database");
const app = (0, express_1.default)();
(0, loaders_1.default)({ expressApp: app });
app.listen(process.env.PORT, () => {
    console.log(`3D-Heritages Platform app listening at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map