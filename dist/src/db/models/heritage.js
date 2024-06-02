"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Heritages extends sequelize_1.Model {
}
Heritages.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
    },
    establishmentDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    recognitionDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, { sequelize: _1.default, tableName: "Heritages" });
exports.default = Heritages;
//# sourceMappingURL=heritage.js.map