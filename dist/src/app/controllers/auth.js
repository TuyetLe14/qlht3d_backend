"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../services/auth"));
const signUp = async (req, res, next) => {
    try {
        const ret = await auth_1.default.signUp(req.body);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const confirmAccount = async (req, res, next) => {
    try {
        const { email, code } = req.query;
        console.log(email);
        const rslt = await auth_1.default.confirmAccount(email, code);
        return res.send(rslt.message);
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const signIn = async (req, res, next) => {
    try {
        const rslt = await auth_1.default.signIn(req.body.username, req.body.password);
        return res.json({ data: rslt });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const refreshToken = async (req, res, next) => {
    try {
        const rslt = await auth_1.default.refreshToken(req.body.refreshToken);
        return res.json({ data: rslt });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const ret = await auth_1.default.changePassword(req.user, oldPassword, newPassword);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const forgotPassword = async (req, res, next) => {
    try {
        const { username } = req.body;
        const ret = await auth_1.default.forgotPassword(username);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const confirmForgotPassword = async (req, res, next) => {
    try {
        const ret = await auth_1.default.confirmForgotPassword(req.body);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const signOut = async (req, res, next) => {
    try {
        const ret = await auth_1.default.signOut(req.user.id, req.body);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const newConfirmAccount = async (req, res, next) => {
    try {
        const { email } = req.query;
        const ret = await auth_1.default.newConfirmAccount(email);
        return res.send(ret.message);
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
exports.default = {
    signUp,
    signIn,
    confirmAccount,
    refreshToken,
    changePassword,
    forgotPassword,
    confirmForgotPassword,
    signOut,
    newConfirmAccount,
};
//# sourceMappingURL=auth.js.map