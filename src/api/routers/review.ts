import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import review from "../../app/controllers/review";

const route  = Router();

export default (app: Router): void => {
	app.use("/review", route);
	route.post(
		"/",
		middlewares.isAuth,
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				userId: Joi.number().required(),
				rating: Joi.number(),
				content: Joi.string().required(),
			}),
		}),
		review.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				userId: Joi.number().required(),
				rating: Joi.number(),
				content: Joi.string().required(),
			}),
		}),
		review.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		review.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		review.getAll
	);
}