import {Model, DataTypes} from 'sequelize';
import sequelize from '.';
import Orders from './order';

class Payments extends Model {
	public id!: number;
	public orderId!: number;
	public pMethod!: string;
	public total!: number;
	public status!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Payments.init(
	{
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		orderId:{
			type: DataTypes.INTEGER,
		},
		pMethod:{
			type: DataTypes.STRING,
		},
		total:{
			type: DataTypes.FLOAT,
		},
		status:{
			type: DataTypes.INTEGER,
		},
		createdAt:{
			type: DataTypes.DATE,
		},
		updatedAt:{
			type: DataTypes.DATE,
		}
	},{sequelize,tableName:"Payments"}
)

export default Payments;