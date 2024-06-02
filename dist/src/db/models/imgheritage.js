"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class ImgHeritage extends sequelize_1.Model {
}
ImgHeritage.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    heritageId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    createAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updateAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, { sequelize: _1.default, tableName: "ImgHeritage" });
exports.default = ImgHeritage;
//# sourceMappingURL=imgheritage.js.map