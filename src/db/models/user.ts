import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

class Users extends Model {
  public id!: number;
  public email!: string;
  public avatar!: string | null;
  public name!: string | null;
  public phoneNumber!: string | null;
  public password!: string | null;
  public group!: string | null;
  public active!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    group: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.INTEGER,
    },

    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: 'Users' }
);


export default Users;
