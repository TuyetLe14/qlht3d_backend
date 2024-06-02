"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const middlewares_1 = __importDefault(require("../middlewares"));
const ticket_1 = __importDefault(require("../../app/controllers/ticket"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/tiket", route);
    route.post("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            heritageId: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string().required(),
            typeTicket: celebrate_1.Joi.string(),
            price: celebrate_1.Joi.number().required(),
            timeStart: celebrate_1.Joi.string().required(),
            timeEnd: celebrate_1.Joi.string().required(),
        }),
    }), ticket_1.default.create);
    route.put("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            heritageId: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string().required(),
            typeTicket: celebrate_1.Joi.string(),
            price: celebrate_1.Joi.number().required(),
            timeStart: celebrate_1.Joi.string().required(),
            timeEnd: celebrate_1.Joi.string().required(),
        }),
    }), ticket_1.default.update);
    route.delete("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), ticket_1.default.remove);
    route.get("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), ticket_1.default.getAll);
};
//# sourceMappingURL=titket.js.map