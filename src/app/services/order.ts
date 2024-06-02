import {Order} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {ticketId, userId, ticketType} = data;
	const currentDate = new Date();
	const order = await Order.create({
		ticketId,
		userId,
		orderDate: currentDate,
		ticketType,
		status:0
	});
	
	return order;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {ticketId, userId, ticketType,status} = data;

	let conditions = {};

	if(ticketId && userId && ticketType && status){
		conditions["ticketId"] = ticketId;
		conditions["userId"] = userId;
		conditions["ticketType"] = ticketType;
		conditions["status"] = status;
	}

	const order = await Order.findByPk(id);
	if (!order){
		throw new Error("Không tìm thấy hoá đơn.");
	}

	return order.update(conditions);
};

const getAll = async() => {
	const orders = await Order.findAll();
	return orders;
}

const remove = async(id:number) =>{
	const ordersDel = await Order.findOne({where: {id}});
	if (!ordersDel){
		throw new Error("Không tìm thấy hoá đơn.");
	};
	
	return await ordersDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}