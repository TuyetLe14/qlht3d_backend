import { Request, Response, NextFunction } from "express";
import userservice from "../services/user";
import { CONST_CODE_RES, CONST_MESS_RES } from "../../helper/status";
import { logger } from "../../extensions/logger/logger";

const get = async (req: any, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.get(req.user.id);
		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		else if (result == null)
			return res.json({
				code: CONST_CODE_RES.EMPTY,
				message: CONST_MESS_RES.EMPTY,
			});
		return res.json({
			code: CONST_CODE_RES.SUCCESS,
			message: CONST_MESS_RES.SUCCESS,
			data: result,
		});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};
const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.getAll();
		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		else if (result == null)
			return res.json({
				code: CONST_CODE_RES.EMPTY,
				message: CONST_MESS_RES.EMPTY,
			});
		else
			return res.json({
				code: CONST_CODE_RES.SUCCESS,
				message: CONST_MESS_RES.SUCCESS,
				data: result,
			});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};

const getAllAgent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.getAllAgent();
		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		else if (result == null)
			return res.json({
				code: CONST_CODE_RES.EMPTY,
				message: CONST_MESS_RES.EMPTY,
			});
		else
			return res.json({
				code: CONST_CODE_RES.SUCCESS,
				message: CONST_MESS_RES.SUCCESS,
				data: result,
			});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.getAllUser();
		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		else if (result == null)
			return res.json({
				code: CONST_CODE_RES.EMPTY,
				message: CONST_MESS_RES.EMPTY,
			});
		else
			return res.json({
				code: CONST_CODE_RES.SUCCESS,
				message: CONST_MESS_RES.SUCCESS,
				data: result,
			});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};

const createAgent = async (req: any, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.createAgent(req.body);

		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		return res.json({
			code: CONST_CODE_RES.SUCCESS,
			message: CONST_MESS_RES.SUCCESS,
		});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};


const update = async (req: any, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.update(req.params.id, req.body);
		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		return res.json({
			code: CONST_CODE_RES.SUCCESS,
			message: CONST_MESS_RES.SUCCESS,
		});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};

const updateAgent = async (req: any, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.update(req.params.id, req.body);
		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		return res.json({
			code: CONST_CODE_RES.SUCCESS,
			message: CONST_MESS_RES.SUCCESS,
		});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};

const remove = async (req: any, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.remove(req.params.id);

		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		return res.json({
			code: CONST_CODE_RES.SUCCESS,
			message: CONST_MESS_RES.SUCCESS,
		});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};
const updateRole = async (req: any, res: Response, next: NextFunction) => {
	try {
		let result = await userservice.updateRole(req.body);

		if (!result)
			return res.json({
				code: CONST_CODE_RES.FAIL,
				message: CONST_MESS_RES.FAIL,
			});
		return res.json({
			code: CONST_CODE_RES.SUCCESS,
			message: CONST_MESS_RES.SUCCESS,
		});
	} catch (err) {
		err.status = err.status || 400;
		return next(err);
	}
};

export default {
	get,
	getAll,
	update,
	updateRole,
	remove,
	createAgent,
	getAllAgent,
	getAllUser,
	updateAgent,
};
