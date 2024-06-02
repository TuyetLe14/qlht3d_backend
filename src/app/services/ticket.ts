import {Ticket} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {heritageId, typeTicket, price, timeStart, timeEnd} = data;
	const ticket = await Ticket.create({
		heritageId,
		typeTicket,
		price,
		timeStart,
		timeEnd
	});
	
	return ticket;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {heritageId, typeTicket, price, timeStart, timeEnd} = data;

	let conditions = {};

	if(heritageId && typeTicket && price && timeStart && timeEnd){
		conditions["heritageId"] = heritageId;
		conditions["typeTicket"] = typeTicket;
		conditions["price"] = price;
		conditions["timeStart"] = timeStart;
		conditions["timeEnd"] = timeEnd;
	}

	const ticket = await Ticket.findByPk(id);
	if (!ticket){
		throw new Error("Không tìm thấy di tích.");
	}

	return ticket.update(conditions);
};

const getAll = async() => {
	const tickets = await Ticket.findAll();
	return tickets;
}

const remove = async(id:number) =>{
	const ticketsDel = await Ticket.findOne({where: {id}});
	if (!ticketsDel){
		throw new Error("Không tìm thấy di tích.");
	};
	
	return await ticketsDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}