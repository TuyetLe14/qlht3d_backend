import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import historical from "../../app/controllers/historicalevent";
const route  = Router();

export default (app: Router): void => {
	app.use("/event", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				eventName: Joi.string().required(),
				eventDate: Joi.string().required(),
				description: Joi.string().required(),
			}),
		}),
		historical.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				eventName: Joi.string().required(),
				eventDate: Joi.string().required(),
				description: Joi.string().required(),
			}),
		}),
		historical.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		historical.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		historical.getAll
	);
}