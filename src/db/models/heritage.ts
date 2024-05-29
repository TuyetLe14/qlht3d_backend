import {Model, DataTypes} from "sequelize";
import sequelize from ".";

class Heritages extends Model{
	public id!: number;
	public name!: string;
	public description!: string;
	public address!: string;
	public location!: string;
	public establishmentDate!: Date;
	public recognitionDate!: Date;
	public status!:string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

}

Heritages.init(
	{
		id: {
			primaryKey:true,
			type:DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
		location: {
			type: DataTypes.STRING,
		},
		establishmentDate: {
			type: DataTypes.DATE,
		},
		recognitionDate: {
			type: DataTypes.DATE,
		},
		status: {
			type: DataTypes.STRING,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{sequelize,tableName:"Heritages"}
)

export default Heritages