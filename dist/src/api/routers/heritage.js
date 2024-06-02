"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const middlewares_1 = __importDefault(require("../middlewares"));
const heritage_1 = __importDefault(require("../../app/controllers/heritage"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/site", route);
    route.post("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            location: celebrate_1.Joi.string(),
            address: celebrate_1.Joi.string().required(),
            establishmentDate: celebrate_1.Joi.string().required(),
            recognitionDate: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), heritage_1.default.create);
    route.put("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            location: celebrate_1.Joi.string(),
            address: celebrate_1.Joi.string().required(),
            establishmentDate: celebrate_1.Joi.string().required(),
            recognitionDate: celebrate_1.Joi.string().required(),
            status: celebrate_1.Joi.string().required(),
        }),
    }), heritage_1.default.update);
    route.delete("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), heritage_1.default.remove);
    route.get("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), heritage_1.default.getAll);
};
//# sourceMappingURL=heritage.js.map