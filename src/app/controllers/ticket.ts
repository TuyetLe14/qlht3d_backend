import { Request, Response, NextFunction } from "express";
import ticket from "../services/ticket";


const getAll = async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await ticket.getAll();
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}
const create =  async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await ticket.create(req.body);
		return res.json({data: ret});
	} catch (error) {
		error.status = error.status || 400;
		return next(error);
	}
};

const update =  async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await ticket.update(req.params.id, req.body);
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}

const remove = async (req: any, res: Response, next:NextFunction) => {
	try {
		const ret = await ticket.remove(req.params.id);
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}

export default {
	getAll,
	create,
	update,
	remove,
}