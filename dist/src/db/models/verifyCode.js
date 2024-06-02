"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class VerifyCodes extends sequelize_1.Model {
}
VerifyCodes.init({
    email: sequelize_1.DataTypes.STRING,
    code: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: _1.default,
    tableName: 'VerifyCodes',
});
exports.default = VerifyCodes;
//# sourceMappingURL=verifyCode.js.map