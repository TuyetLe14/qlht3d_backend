"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const heritage_1 = __importDefault(require("./heritage"));
class Tickets extends sequelize_1.Model {
}
Tickets.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    heritageId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    typeTicket: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    timeStart: {
        type: sequelize_1.DataTypes.DATE,
    },
    timeEnd: {
        type: sequelize_1.DataTypes.DATE,
    },
    createAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, { sequelize: _1.default, tableName: "Tickets" });
Tickets.belongsTo(heritage_1.default, { targetKey: "id", foreignKey: "heritageId" });
exports.default = Tickets;
//# sourceMappingURL=ticket.js.map