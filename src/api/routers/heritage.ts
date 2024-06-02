import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import heritage from "../../app/controllers/heritage";

const route  = Router();

export default (app: Router): void => {
	app.use("/site", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				name: Joi.string().required(),
				description: Joi.string().required(),
				location: Joi.string(),
				address: Joi.string().required(),
				establishmentDate: Joi.string().required(),
				recognitionDate: Joi.string().required(),
				status: Joi.string().required(),
			}),
		}),
		heritage.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				name: Joi.string().required(),
				description: Joi.string().required(),
				location: Joi.string(),
				address: Joi.string().required(),
				establishmentDate: Joi.string().required(),
				recognitionDate: Joi.string().required(),
				status: Joi.string().required(),
			}),
		}),
		heritage.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		heritage.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		heritage.getAll
	);
}