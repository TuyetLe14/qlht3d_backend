import {Model, DataTypes} from "sequelize";
import sequelize from ".";
import Heritages from "./heritage";

class Tickets extends Model {
	public id!: number;
	public heritageId!: number;
	public typeTicket: string;
	public price!: number;
	public timeStart!: Date;
	public timeEnd!: Date;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Tickets.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		heritageId: {
			type: DataTypes.INTEGER,
		},
		typeTicket: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.FLOAT,
		},
		timeStart: {
			type: DataTypes.DATE,
		},
		timeEnd: {
			type: DataTypes.DATE,
		},
		createAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		}
	},{sequelize, tableName:"Tickets"}
)

Tickets.belongsTo(Heritages,{targetKey:"id",foreignKey:"heritageId"})

export default Tickets;