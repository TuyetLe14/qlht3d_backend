import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import order from "../../app/controllers/order";

const route  = Router();

export default (app: Router): void => {
	app.use("/order", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				ticketId: Joi.number().required(),
				userId: Joi.number().required(),
				ticketType: Joi.string().required(),
			}),
		}),
		order.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				ticketId: Joi.number().required(),
				userId: Joi.number().required(),
				ticketType: Joi.string().required(),
				status:Joi.number().required()
			}),
		}),
		order.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		order.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		order.getAll
	);
}