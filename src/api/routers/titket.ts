import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import ticket from "../../app/controllers/ticket";

const route  = Router();

export default (app: Router): void => {
	app.use("/tiket", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				description: Joi.string().required(),
				typeTicket: Joi.string(),
				price: Joi.number().required(),
				timeStart: Joi.string().required(),
				timeEnd: Joi.string().required(),
			}),
		}),
		ticket.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				description: Joi.string().required(),
				typeTicket: Joi.string(),
				price: Joi.number().required(),
				timeStart: Joi.string().required(),
				timeEnd: Joi.string().required(),
			}),
		}),
		ticket.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		ticket.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		ticket.getAll
	);
}