"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const payment_1 = __importDefault(require("./payment"));
class DetailPayments extends sequelize_1.Model {
}
DetailPayments.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    payment_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    payment_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    createAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updateAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, { sequelize: _1.default, tableName: "DetailPayments" });
DetailPayments.belongsTo(payment_1.default, { targetKey: "id", foreignKey: "payment_id" });
exports.default = DetailPayments;
//# sourceMappingURL=detailpayment.js.map