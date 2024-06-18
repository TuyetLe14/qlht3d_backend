"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const middlewares_1 = __importDefault(require("../../api/middlewares"));
const user_1 = __importDefault(require("../../app/controllers/user"));
const route = (0, express_1.Router)();
const projectNameRouter = "user";
exports.default = (app) => {
    app.use(`/${projectNameRouter}`, route);
    route.get("/getAllAgent", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), user_1.default.getAllAgent);
    route.get("/getAllUser", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), user_1.default.getAllUser);
    route.post("/addAgent", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().min(8).required(),
            name: celebrate_1.Joi.string().required(),
            phoneNumber: celebrate_1.Joi.string().allow("", null),
            group: celebrate_1.Joi.string().required(),
            street: celebrate_1.Joi.string(),
            ward: celebrate_1.Joi.string(),
            district: celebrate_1.Joi.string(),
            city: celebrate_1.Joi.string(),
            avatar: celebrate_1.Joi.string().uri(),
            active: celebrate_1.Joi.number()
        }),
    }), user_1.default.createAgent);
    route.get("/", middlewares_1.default.isAuth, user_1.default.get);
    route.put("/editAgent/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string(),
            phoneNumber: celebrate_1.Joi.string(),
            password: celebrate_1.Joi.string(),
            group: celebrate_1.Joi.string(),
            email: celebrate_1.Joi.string(),
            street: celebrate_1.Joi.string(),
            ward: celebrate_1.Joi.string(),
            district: celebrate_1.Joi.string(),
            city: celebrate_1.Joi.string(),
        }),
    }), user_1.default.updateAgent);
    route.put("/:id", middlewares_1.default.isAuth, (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string(),
            phoneNumber: celebrate_1.Joi.string(),
            password: celebrate_1.Joi.string(),
            group: celebrate_1.Joi.string(),
            email: celebrate_1.Joi.string(),
            street: celebrate_1.Joi.string(),
            ward: celebrate_1.Joi.string(),
            district: celebrate_1.Joi.string(),
            city: celebrate_1.Joi.string()
        }),
    }), user_1.default.update);
    route.delete("/:id", middlewares_1.default.isAuth, middlewares_1.default.permission("Admin"), user_1.default.remove);
};
//# sourceMappingURL=user.js.map