import {Model, DataTypes} from "sequelize";
import sequelize from ".";
import Heritages from "./heritage";

class Conservations extends Model{
	public id!: number;
	public heritageId!: number;
	public dateCover!: Date;
	public dateUncover!: Date;
	public personRespon!: string;
	public cost!: number;
	public readonly createAt!: Date;
	public readonly updateAt!: Date;
}

Conservations.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		heritageId: {
			type: DataTypes.INTEGER,
		},
		dateCover: {
			type: DataTypes.DATE,
		},
		dateUncover: {
			type: DataTypes.DATE,
		},
		personRespon: {
			type: DataTypes.STRING,
		},
		cost: {
			type: DataTypes.FLOAT,
		},
		createdAt:{
			type: DataTypes.DATE,
		},
		updatedAt:{
			type: DataTypes.DATE,
		},
	},{sequelize,tableName:"Conservations"}
)

Conservations.belongsTo(Heritages,{targetKey:"id", foreignKey:"heritageId"})

export default Conservations;