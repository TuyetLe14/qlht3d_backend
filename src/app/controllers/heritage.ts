import { Request, Response, NextFunction } from "express";
import heritage from "../services/heritage";


const getAll = async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await heritage.getAll();
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}
const create =  async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await heritage.create(req.body);
		return res.json({data: ret});
	} catch (error) {
		error.status = error.status || 400;
		return next(error);
	}
};

const update =  async (req: any, res: Response, next: NextFunction) => {
	try {
		const ret = await heritage.update(req.params.id, req.body);
		return res.json({data: ret});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
}

const remove = async (req: any, res: Response, next:NextFunction) => {
	try {
		const ret = await heritage.remove(req.params.id);
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