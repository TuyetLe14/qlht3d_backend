import { Router } from "express";
import {celebrate, Joi} from "celebrate";
import middlewares from "../middlewares";
import uploads from "../../extensions/uploads";
import imgHeritage from "../../app/controllers/imgheritage";

const route  = Router();

export default (app: Router): void => {
	app.use("/img", route);
	route.post(
		"/",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		uploads.img.single("img"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				description: Joi.string(),
			}),
		}),
		imgHeritage.create
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		uploads.img.single("img"),
		celebrate({
			body: Joi.object({
				heritageId: Joi.number().required(),
				description: Joi.string()
			}),
		}),
		imgHeritage.update
	);

	route.delete(
		"/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		imgHeritage.remove
	);

	route.get("/",
		middlewares.isAuth, 
		middlewares.permission("Admin"),
		imgHeritage.getAll
	);
}