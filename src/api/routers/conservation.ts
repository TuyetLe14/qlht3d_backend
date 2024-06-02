import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import conservation from "../../app/controllers/conservation";
const route  = Router();

export default (app: Router): void => {
	app.use("/cover", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				dateCover: Joi.string().required(),
				dateUncover: Joi.string().required(),
				personRespon: Joi.string().required(),
				cost: Joi.number().required(),
			}),
		}),
		conservation.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				dateCover: Joi.string().required(),
				dateUncover: Joi.string().required(),
				personRespon: Joi.string().required(),
				cost: Joi.number().required(),
			}),
		}),
		conservation.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		conservation.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		conservation.getAll
	);
}