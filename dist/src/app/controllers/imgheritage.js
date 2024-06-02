"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imgheritage_1 = __importDefault(require("../services/imgheritage"));
const create = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('Please upload a firmware file');
        return next(error);
    }
    try {
        const ret = await imgheritage_1.default.create(req.file, req.body);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const update = async (req, res, next) => {
    try {
        const ret = await imgheritage_1.default.update(Number(req.params.id), req.file, req.body);
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await imgheritage_1.default.remove(Number(id));
        return res.json({ message: 'Heritage image deleted successfully' });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
const getAll = async (req, res, next) => {
    try {
        const ret = await imgheritage_1.default.getAll();
        return res.json({ data: ret });
    }
    catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};
exports.default = {
    create,
    update,
    remove,
    getAll
};
//# sourceMappingURL=imgheritage.js.map