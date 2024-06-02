"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("../api"));
exports.default = (app) => {
    app.use((0, morgan_1.default)('short'));
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
    app.get('/test', (req, res) => {
        return res.json({ test: 'Tuong' });
    });
    app.use('/heritages', (0, api_1.default)());
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: 'Unauthorized' }).end();
        }
        if ((0, celebrate_1.isCelebrateError)(err)) {
            return res.status(400).send({ message: err.details.values().next().value.toString() }).end();
        }
        return res
            .status(err.status || 500)
            .json({ message: err.message })
            .end();
    });
};
//# sourceMappingURL=express.js.map