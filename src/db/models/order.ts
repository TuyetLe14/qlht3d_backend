import {Model, DataTypes} from 'sequelize';
import sequelize from '.';
import Tickets from './ticket';
import Users from './user';

class Orders extends Model{
	public id!: number;
	public ticketId!: number;
	public userId!:number;
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
		ticketId:{
			type: DataTypes.INTEGER,
		},
		userId:{
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

Orders.belongsTo(Users,{targetKey:"id", foreignKey:"userId"});
Orders.belongsTo(Tickets,{targetKey:"id",foreignKey:"ticketId"});

export default Orders;