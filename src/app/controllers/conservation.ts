import { Request, Response, NextFunction } from "express";
import conservation from "../services/conservation";


const getAll = async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await conservation.getAll();
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}
const create =  async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await conservation.create(req.body);
		return res.json({data: ret});
	} catch (error) {
		error.status = error.status || 400;
		return next(error);
	}
};

const update =  async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await conservation.update(req.params.id, req.body);
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}

const remove = async (req: any, res: Response, next:NextFunction) => {
	try {
		const ret = await conservation.remove(req.params.id);
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