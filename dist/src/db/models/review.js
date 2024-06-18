"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const user_1 = __importDefault(require("./user"));
const heritage_1 = __importDefault(require("./heritage"));
class Reviews extends sequelize_1.Model {
}
Reviews.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    heritageId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dateComment: {
        type: sequelize_1.DataTypes.DATE,
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, { sequelize: _1.default, tableName: "Reviews" });
Reviews.belongsTo(user_1.default, { targetKey: "id", foreignKey: "userId" });
Reviews.belongsTo(heritage_1.default, { targetKey: "id", foreignKey: "heritageId" });
exports.default = Reviews;
//# sourceMappingURL=review.js.map