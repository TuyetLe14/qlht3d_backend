import {Payment, DetailPayment} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {orderId, pMethod, total} = data;
	const payment = await Payment.create({
		orderId,
		pMethod,
		total,
		status:0
	});	
	return payment;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {orderId, pMethod, total, status} = data;
	const payment = await Payment.findByPk(id);
	if (!payment){
		throw new Error("Không tìm thấy thanh toán.");
	}
	let conditions = {};

	if(orderId && pMethod &&  total && status){
		conditions["orderId"] = orderId;
		conditions["pMethod"] = pMethod;
		conditions["total"] = total;
		conditions["status"] = status;
		if (status === 1){
			const detail = await DetailPayment.create({
				paymentId: payment.id,
				amount: total,
			})
		}
	}



	return payment.update(conditions);
};

const getAll = async() => {
	const payments = await Payment.findAll();
	return payments;
}

const remove = async(id:number) =>{
	const paymentsDel = await Payment.findOne({where: {id}});
	if (!paymentsDel){
		throw new Error("Không tìm thấy thanh toán.");
	};
	
	return await paymentsDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}