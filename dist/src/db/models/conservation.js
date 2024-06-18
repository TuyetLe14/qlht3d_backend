"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const heritage_1 = __importDefault(require("./heritage"));
class Conservations extends sequelize_1.Model {
}
Conservations.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    heritageId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dateCover: {
        type: sequelize_1.DataTypes.DATE,
    },
    dateUncover: {
        type: sequelize_1.DataTypes.DATE,
    },
    personRespon: {
        type: sequelize_1.DataTypes.STRING,
    },
    cost: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, { sequelize: _1.default, tableName: "Conservations" });
Conservations.belongsTo(heritage_1.default, { targetKey: "id", foreignKey: "heritageId" });
exports.default = Conservations;
//# sourceMappingURL=conservation.js.map