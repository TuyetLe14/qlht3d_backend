import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import payment from "../../app/controllers/payment";

const route  = Router();

export default (app: Router): void => {
	app.use("/payment", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				orderId: Joi.number().required(),
				pMethod: Joi.string().required(),
				total: Joi.number().required(),
			}),
		}),
		payment.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				orderId: Joi.number().required(),
				pMethod: Joi.string().required(),
				total: Joi.number().required(),
				status:Joi.number(),
			}),
		}),
		payment.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		payment.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		payment.getAll
	);
}