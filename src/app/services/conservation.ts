import {Conservation} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {heritageId, dateCover, dateUncover, personRespon, cost} = data;
	const conservation = await Conservation.create({
		heritageId,
		dateCover,
		dateUncover,
		personRespon,
		cost
	});
	
	return conservation;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {heritageId, dateCover, dateUncover, personRespon, cost} = data;

	let conditions = {};

	if(heritageId && dateCover && dateUncover && personRespon && cost){
		conditions["heritageId"] = heritageId;
		conditions["dateCover"] = dateCover;
		conditions["dateUncover"] = dateUncover;
		conditions["personRespon"] = personRespon;
		conditions["cost"] = cost;
	}

	const conservation = await Conservation.findByPk(id);
	if (!conservation){
		throw new Error("Không tìm thấy di tích.");
	}

	return conservation.update(conditions);
};

const getAll = async() => {
	const conservations = await Conservation.findAll();
	return conservations;
}

const remove = async(id:number) =>{
	const conservationDel = await Conservation.findOne({where: {id}});
	if (!conservationDel){
		throw new Error("Không tìm thấy di tích.");
	};
	
	return await conservationDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}