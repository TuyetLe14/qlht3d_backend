import {Review} from "../../db";
import { Op, where } from 'sequelize';

const create = async(data: any) => {
	const {heritageId, userId, rating, content} = data;
	const currentDate = new Date();
	const review = await Review.create({
		heritageId,
		userId,
		dateComment: currentDate,
		rating,
		content
	});
	
	return review;
};

const update = async(id: number, data: any) => {
	console.log("-----------------");
	console.log(data);
	const {heritageId, userId, rating, content} = data;

	let conditions = {};

	if(heritageId && userId && rating && content){
		conditions["heritageId"] = heritageId;
		conditions["userId"] = userId;
		conditions["rating"] = rating;
		conditions["content"] = content;
	}

	const review = await Review.findByPk(id);
	if (!review){
		throw new Error("Không tìm thấy di tích.");
	}

	return review.update(conditions);
};

const getAll = async() => {
	const reviews = await Review.findAll();
	return reviews;
}

const remove = async(id:number) =>{
	const reviewsDel = await Review.findOne({where: {id}});
	if (!reviewsDel){
		throw new Error("Không tìm thấy di tích.");
	};
	
	return await reviewsDel.destroy();
};

export default {
	getAll,
	create,
	update,
	remove,
}