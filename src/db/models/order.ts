import {Model, DataTypes} from 'sequelize';
import sequelize from '.';
import Users from './user';
import Heritages from './heritage';

class Orders extends Model{
	public id!: number;
	public userId!: number;
	public heritageId!: number;
	public orderDate!: Date;
	public status !: number;
	public ticketType!: string;
	public readonly createAt!: Date;
	public readonly updateAt!: Date;
}

Orders.init(
	{
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId:{
			type: DataTypes.INTEGER,
		},
		heritageId:{
			type: DataTypes.INTEGER,
		},
		orderDate:{
			type: DataTypes.DATE,
		},
		status:{
			type: DataTypes.INTEGER,
		},
		ticketType:{
			type: DataTypes.STRING,
		},
		createAt:{
			type: DataTypes.DATE,
		},
		updateAt:{
			type: DataTypes.DATE,
		}
	},{sequelize,tableName:"Orders"}
)

Orders.belongsTo(Users,{targetKey:"id",foreignKey:"userId"});
Orders.belongsTo(Heritages,{targetKey:"id",foreignKey:"heritageId"});

export default Orders;