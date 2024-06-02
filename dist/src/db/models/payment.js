"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Payments extends sequelize_1.Model {
}
Payments.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    pMethod: {
        type: sequelize_1.DataTypes.STRING,
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updateAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, { sequelize: _1.default, tableName: "Payments" });
exports.default = Payments;
//# sourceMappingURL=payment.js.map