import {Heritage} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {name, description, address, location, establishmentDate, recognitionDate, status} = data;
	const heritage = await Heritage.create({
		name,
		description,
		address,
		location,
		establishmentDate,
		recognitionDate,
		status
	});
	
	return heritage;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {name, description, address, location, establishmentDate, recognitionDate, status} = data;

	let conditions = {};

	if(name && description && address && location && establishmentDate && recognitionDate && status){
		conditions["name"] = name;
		conditions["description"] = description;
		conditions["address"] = address;
		conditions["location"] = location;
		conditions["establishmentDate"] = establishmentDate;
		conditions["recognitionDate"] = recognitionDate;
		conditions["status"] = status;
	}

	const heritage = await Heritage.findByPk(id);
	if (!heritage){
		throw new Error("Không tìm thấy di tích.");
	}

	return heritage.update(conditions);
};

const getAll = async() => {
	const heritages = await Heritage.findAll();
	return heritages;
}

const remove = async(id:number) =>{
	const heritagesDel = await Heritage.findOne({where: {id}});
	if (!heritagesDel){
		throw new Error("Không tìm thấy di tích.");
	};
	
	return await heritagesDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}