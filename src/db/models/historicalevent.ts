import { Model, DataTypes } from "sequelize";
import sequelize from ".";
import Heritages from "./heritage";

class HistoricalEvents extends Model{
	public id!: number;
	public id_heritage!: number;
	public eventName!: string;
	public eventDate!: Date;
	public description!: string | null;
	public readonly createAt!: Date;
	public readonly updateAt!: Date;
}

HistoricalEvents.init({
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	heritageId:{
		type: DataTypes.INTEGER,
	},
	eventName:{
		type: DataTypes.STRING,
	},
	eventDate:{
		type: DataTypes.DATE,
	},
	description:{
		type: DataTypes.STRING,
	},
	createAt:{
		type: DataTypes.DATE,
	},
	updateAt:{
		type: DataTypes.DATE,
	}
},{sequelize,tableName:"HistoricalEvents"}
);

HistoricalEvents.belongsTo(Heritages, {targetKey:"id", foreignKey: "heritageId"});

export default HistoricalEvents;