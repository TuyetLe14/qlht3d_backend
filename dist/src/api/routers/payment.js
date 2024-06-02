"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const middlewares_1 = __importDefault(require("../middlewares"));
const payment_1 = __importDefault(require("../../app/controllers/payment"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/payment", route);
    route.post("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            orderId: celebrate_1.Joi.number().required(),
            pMethod: celebrate_1.Joi.string().required(),
            total: celebrate_1.Joi.number().required(),
        }),
    }), payment_1.default.create);
    route.put("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            orderId: celebrate_1.Joi.number().required(),
            pMethod: celebrate_1.Joi.string().required(),
            total: celebrate_1.Joi.number().required(),
            status: celebrate_1.Joi.number(),
        }),
    }), payment_1.default.update);
    route.delete("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), payment_1.default.remove);
    route.get("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), payment_1.default.getAll);
};
//# sourceMappingURL=payment.js.map