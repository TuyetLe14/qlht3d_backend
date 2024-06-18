"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const conservation_1 = __importDefault(require("./routers/conservation"));
const heritage_1 = __importDefault(require("./routers/heritage"));
const imgheritage_1 = __importDefault(require("./routers/imgheritage"));
const order_1 = __importDefault(require("./routers/order"));
const payment_1 = __importDefault(require("./routers/payment"));
const review_1 = __importDefault(require("./routers/review"));
const titket_1 = __importDefault(require("./routers/titket"));
const historicalevent_1 = __importDefault(require("./routers/historicalevent"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, auth_1.default)(app);
    (0, user_1.default)(app);
    (0, conservation_1.default)(app);
    (0, heritage_1.default)(app);
    (0, imgheritage_1.default)(app);
    (0, order_1.default)(app);
    (0, payment_1.default)(app);
    (0, review_1.default)(app);
    (0, titket_1.default)(app);
    (0, historicalevent_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map