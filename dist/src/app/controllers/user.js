"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../services/user"));
const status_1 = require("../../helper/status");
const get = async (req, res, next) => {
    try {
        let result = await user_1.default.get(req.user.id);
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        else if (result == null)
            return res.json({
                code: status_1.CONST_CODE_RES.EMPTY,
                message: status_1.CONST_MESS_RES.EMPTY,
            });
        return res.json({
            code: status_1.CONST_CODE_RES.SUCCESS,
            message: status_1.CONST_MESS_RES.SUCCESS,
            data: result,
        });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const getAll = async (req, res, next) => {
    try {
        let result = await user_1.default.getAll();
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        else if (result == null)
            return res.json({
                code: status_1.CONST_CODE_RES.EMPTY,
                message: status_1.CONST_MESS_RES.EMPTY,
            });
        else
            return res.json({
                code: status_1.CONST_CODE_RES.SUCCESS,
                message: status_1.CONST_MESS_RES.SUCCESS,
                data: result,
            });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const getAllAgent = async (req, res, next) => {
    try {
        let result = await user_1.default.getAllAgent();
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        else if (result == null)
            return res.json({
                code: status_1.CONST_CODE_RES.EMPTY,
                message: status_1.CONST_MESS_RES.EMPTY,
            });
        else
            return res.json({
                code: status_1.CONST_CODE_RES.SUCCESS,
                message: status_1.CONST_MESS_RES.SUCCESS,
                data: result,
            });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const getAllUser = async (req, res, next) => {
    try {
        let result = await user_1.default.getAllUser();
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        else if (result == null)
            return res.json({
                code: status_1.CONST_CODE_RES.EMPTY,
                message: status_1.CONST_MESS_RES.EMPTY,
            });
        else
            return res.json({
                code: status_1.CONST_CODE_RES.SUCCESS,
                message: status_1.CONST_MESS_RES.SUCCESS,
                data: result,
            });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const createAgent = async (req, res, next) => {
    try {
        let result = await user_1.default.createAgent(req.body);
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        return res.json({
            code: status_1.CONST_CODE_RES.SUCCESS,
            message: status_1.CONST_MESS_RES.SUCCESS,
        });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const update = async (req, res, next) => {
    try {
        let result = await user_1.default.update(req.params.id, req.body);
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        return res.json({
            code: status_1.CONST_CODE_RES.SUCCESS,
            message: status_1.CONST_MESS_RES.SUCCESS,
        });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const updateAgent = async (req, res, next) => {
    try {
        let result = await user_1.default.updateAgent(req.params.id, req.body);
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        return res.json({
            code: status_1.CONST_CODE_RES.SUCCESS,
            message: status_1.CONST_MESS_RES.SUCCESS,
        });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const remove = async (req, res, next) => {
    try {
        let result = await user_1.default.remove(req.params.id);
        if (!result)
            return res.json({
                code: status_1.CONST_CODE_RES.FAIL,
                message: status_1.CONST_MESS_RES.FAIL,
            });
        return res.json({
            code: status_1.CONST_CODE_RES.SUCCESS,
            message: status_1.CONST_MESS_RES.SUCCESS,
        });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
exports.default = {
    get,
    getAll,
    update,
    remove,
    createAgent,
    getAllAgent,
    getAllUser,
    updateAgent,
};
//# sourceMappingURL=user.js.map