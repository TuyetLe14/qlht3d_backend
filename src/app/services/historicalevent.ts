import {HistoricalEvent} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {heritageId, eventName, eventDate, description} = data;
	const historical = await HistoricalEvent.create({
		heritageId,
		eventName,
		eventDate,
		description,
	});
	
	return historical;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {heritageId, eventName, eventDate, description} = data;

	let conditions = {};

	if(heritageId && eventName && eventDate && description){
		conditions["heritageId"] = heritageId;
		conditions["eventName"] = eventName;
		conditions["eventDate"] = eventDate;
		conditions["description"] = description;
	}

	const historical = await HistoricalEvent.findByPk(id);
	if (!historical){
		throw new Error("Không tìm thấy di tích.");
	}

	return historical.update(conditions);
};

const getAll = async() => {
	const historicals = await HistoricalEvent.findAll();
	return historicals;
}

const remove = async(id:number) =>{
	const historicalDel = await HistoricalEvent.findOne({where: {id}});
	if (!historicalDel){
		throw new Error("Không tìm thấy di tích.");
	};
	
	return await historicalDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}