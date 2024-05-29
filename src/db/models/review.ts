import {Model, DataTypes} from "sequelize";
import sequelize from '.';
import User from "./user";
import Heritages from "./heritage";

class Reviews extends Model {
	public id!: number;
	public heritageId!: number;
	public userId!: number;
	public dateComment: Date | null;
	public rating!: number | null;
	public content!: string | null;
	public readonly createAt: Date;
	public readonly updateAt: Date;
}

Reviews.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		heritageId: {
			type: DataTypes.INTEGER,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		dateComment: {
			type: DataTypes.DATE,
		},
		rating: {
			type: DataTypes.FLOAT,
		},
		content: {
			type: DataTypes.STRING,
		},
		creatAt: {
			type: DataTypes.DATE,
		},
		updateAt: {
			type: DataTypes.DATE,
		},
	}, {sequelize,tableName:"Reviews"}
)

Reviews.belongsTo(User,{targetKey:"id", foreignKey:"userId"});
Reviews.belongsTo(Heritages,{targetKey:"id",foreignKey:"heritageId"});

export default Reviews