"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const middlewares_1 = __importDefault(require("../middlewares"));
const auth_1 = __importDefault(require("../../app/controllers/auth"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use(route);
    route.post("/signUp", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            password: celebrate_1.Joi.string().min(8).required(),
            email: celebrate_1.Joi.string().email().required(),
            phoneNumber: celebrate_1.Joi.string().allow("", null),
            name: celebrate_1.Joi.string(),
            avatar: celebrate_1.Joi.string().uri(),
        }),
    }), auth_1.default.signUp);
    route.get("/confirmAccount", (0, celebrate_1.celebrate)({
        query: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(),
            code: celebrate_1.Joi.string().required(),
        }),
    }), auth_1.default.confirmAccount);
    route.get("/newConfirmAccount", (0, celebrate_1.celebrate)({
        query: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(),
        }),
    }), auth_1.default.newConfirmAccount);
    route.post("/signIn", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            password: celebrate_1.Joi.string().min(8).required(),
            username: celebrate_1.Joi.string().min(8).required(),
        }),
    }), auth_1.default.signIn);
    route.post("/refreshToken", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            refreshToken: celebrate_1.Joi.string().required(),
        }),
    }), auth_1.default.refreshToken);
    route.post("/changePassword", middlewares_1.default.isAuth, (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            newPassword: celebrate_1.Joi.string().min(8).required(),
            oldPassword: celebrate_1.Joi.string().min(8).required(),
        }),
    }), auth_1.default.changePassword);
    route.post("/forgotPassword", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            username: celebrate_1.Joi.string().email().required(),
        }),
    }), auth_1.default.forgotPassword);
    route.post("/confirmForgotPassword", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            username: celebrate_1.Joi.string()
                .regex(/^[+@.a-zA-Z0-9]+$/)
                .required(),
            password: celebrate_1.Joi.string().min(8).required(),
            confirmationCode: celebrate_1.Joi.string().required(),
        }),
    }), auth_1.default.confirmForgotPassword);
    route.post("/signOut", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            did: celebrate_1.Joi.string(),
        }).unknown(),
    }), middlewares_1.default.isAuth, auth_1.default.signOut);
};
//# sourceMappingURL=auth.js.map