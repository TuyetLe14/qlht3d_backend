import {Model, DataTypes} from 'sequelize';
import sequelize from '.';
import Heritages from '.';

class ImgHeritage extends Model{
	public id!: number;
	public heritageId!: number;
	public url!: string;
	public description!: string;
	public readonly createAt!: Date;
	public readonly updateAt!: Date;
}

ImgHeritage.init(
	{
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement:true,
		},
		heritageId: {
			type: DataTypes.INTEGER,
		},
		url: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		createAt: {
			type: DataTypes.DATE,
		},
		updateAt: {
			type: DataTypes.DATE,
		},
	},{sequelize,tableName:"ImgHeritage"}
)

export default ImgHeritage