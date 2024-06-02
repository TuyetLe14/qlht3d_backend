"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const middlewares_1 = __importDefault(require("../middlewares"));
const review_1 = __importDefault(require("../../app/controllers/review"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/review", route);
    route.post("/", middlewares_1.default.isAuth, (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            heritageId: celebrate_1.Joi.number().required(),
            userId: celebrate_1.Joi.number().required(),
            rating: celebrate_1.Joi.number(),
            content: celebrate_1.Joi.string().required(),
        }),
    }), review_1.default.create);
    route.put("/:id", middlewares_1.default.isAuth, (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            heritageId: celebrate_1.Joi.number().required(),
            userId: celebrate_1.Joi.number().required(),
            rating: celebrate_1.Joi.number(),
            content: celebrate_1.Joi.string().required(),
        }),
    }), review_1.default.update);
    route.delete("/:id", middlewares_1.default.isAuth, review_1.default.remove);
    route.get("/", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), review_1.default.getAll);
};
//# sourceMappingURL=review.js.map