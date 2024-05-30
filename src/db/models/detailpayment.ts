import {Model, DataTypes} from 'sequelize';
import sequelize from '.';
import Payments from './payment';

class DetailPayments extends Model{
	public id!: number;
	public payment_id!: number;
	public payment_date!: string;
	public amount!: number;
	public readonly createAt!: Date;
	public readonly updateAt!: Date;
}

DetailPayments.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		payment_id: {
			type: DataTypes.INTEGER,
		},
		payment_date: {
			type: DataTypes.DATE,
		},
		amount: {
			type: DataTypes.FLOAT,
		},
		createAt:{
			type: DataTypes.DATE,
		},
		updateAt:{
			type: DataTypes.DATE,
		}
	},{sequelize, tableName:"DetailPayments"}
)

DetailPayments.belongsTo(Payments,{targetKey:"id",foreignKey:"payment_id"});

export default DetailPayments;