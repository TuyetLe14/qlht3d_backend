"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../services/order"));
const getAll = async (req, res, next) => {
    try {
        const ret = await order_1.default.getAll();
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const create = async (req, res, next) => {
    try {
        const ret = await order_1.default.create(req.body);
        return res.json({ data: ret });
    }
    catch (error) {
        error.status = error.status || 400;
        return next(error);
    }
};
const update = async (req, res, next) => {
    try {
        const ret = await order_1.default.update(req.params.id, req.body);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const remove = async (req, res, next) => {
    try {
        const ret = await order_1.default.remove(req.params.id);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=order.js.map