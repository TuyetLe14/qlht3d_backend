"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefressToken = exports.isAuth = exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
const env = process.env.NODE_ENV || 'dev';
const jwks = require(`../../../jwk.${env}.json`);
const getSecret = (index) => {
    const secret = (0, jwk_to_pem_1.default)(jwks.keys[index], { private: true });
    return secret;
};
const createToken = async (data) => {
    const jsontoken = await (0, jsonwebtoken_1.sign)({ user: data }, getSecret(1), {
        expiresIn: 3600,
        algorithm: 'RS256',
    });
    const refreshToken = (0, jsonwebtoken_1.sign)({ user: data }, getSecret(0), {
        expiresIn: '365d',
        algorithm: 'RS256',
    });
    return {
        AccessToken: jsontoken,
        ExpiresIn: 3600,
        TokenType: 'Bearer',
        RefreshToken: refreshToken,
        IdToken: jsontoken,
    };
};
exports.createToken = createToken;
const getTokenFromHeader = (req) => {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};
const isAuth = async (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (token) {
        try {
            const decoded = await (0, jsonwebtoken_1.verify)(token, getSecret(1), { algorithms: ['RS256'] });
            req.user = decoded.user;
            return next();
        }
        catch (err) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
    }
    return res.status(401).json({
        message: 'Unauthorized',
    });
};
exports.isAuth = isAuth;
const isRefressToken = async (token) => {
    const userDetail = (0, jsonwebtoken_1.verify)(token, getSecret(0), { algorithms: ['RS256'] });
    if (!userDetail) {
        throw new Error('Unauthorized');
    }
    const jsontoken = await (0, jsonwebtoken_1.sign)({ user: Object(userDetail).user }, getSecret(1), {
        expiresIn: 3600,
        algorithm: 'RS256',
    });
    const refreshToken = (0, jsonwebtoken_1.sign)({ user: Object(userDetail).user }, getSecret(0), {
        expiresIn: '365d',
        algorithm: 'RS256',
    });
    return {
        AccessToken: jsontoken,
        ExpiresIn: 3600,
        TokenType: 'Bearer',
        IdToken: jsontoken,
        RefreshToken: refreshToken,
    };
};
exports.isRefressToken = isRefressToken;
const decodeToken = async (token) => {
    const decoded = await (0, jsonwebtoken_1.verify)(token, getSecret(1), { algorithms: ['RS256'] });
    return decoded.user;
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=token.js.map