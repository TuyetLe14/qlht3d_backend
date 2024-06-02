"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    group: {
        type: sequelize_1.DataTypes.STRING,
    },
    active: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, { sequelize: _1.default, tableName: 'Users' });
exports.default = Users;
//# sourceMappingURL=user.js.map