import {Model, DataTypes} from 'sequelize';
import sequelize from '.';
import Payments from './payment';
import Users from './user';

class DetailPayments extends Model{
	public id!: number;
	public payment_id!: number;
	public userId!:number;
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
		userId:{
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
DetailPayments.belongsTo(Users,{targetKey:"id", foreignKey:"userId"});

export default DetailPayments;