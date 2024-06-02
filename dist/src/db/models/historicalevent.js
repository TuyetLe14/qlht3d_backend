"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const heritage_1 = __importDefault(require("./heritage"));
class HistoricalEvents extends sequelize_1.Model {
}
HistoricalEvents.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    heritageId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    eventName: {
        type: sequelize_1.DataTypes.STRING,
    },
    eventDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    createAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updateAt: {
        type: sequelize_1.DataTypes.DATE,
    }
}, { sequelize: _1.default, tableName: "HistoricalEvents" });
HistoricalEvents.belongsTo(heritage_1.default, { targetKey: "id", foreignKey: "heritageId" });
exports.default = HistoricalEvents;
//# sourceMappingURL=historicalevent.js.map