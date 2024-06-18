"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const ticket_1 = __importDefault(require("./ticket"));
const user_1 = __importDefault(require("./user"));
class Orders extends sequelize_1.Model {
}
Orders.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticketId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ticketType: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, { sequelize: _1.default, tableName: "Orders" });
Orders.belongsTo(user_1.default, { targetKey: "id", foreignKey: "userId" });
Orders.belongsTo(ticket_1.default, { targetKey: "id", foreignKey: "ticketId" });
exports.default = Orders;
//# sourceMappingURL=order.js.map