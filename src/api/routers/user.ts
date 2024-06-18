import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import middlewares from "../../api/middlewares";
import user from "../../app/controllers/user";
const route = Router();

const projectNameRouter = "user";

export default (app: Router): void => {
	app.use(`/${projectNameRouter}`, route);
	route.get(
		"/getAllAgent",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		user.getAllAgent
	);

	route.get(
		"/getAllUser",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		user.getAllUser
	);


	route.post(
		"/addAgent",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
		 body: Joi.object({
		   email: Joi.string().required(),
		   password: Joi.string().min(8).required(),
		   name: Joi.string().required(),
		   phoneNumber: Joi.string().allow("", null),
		   group: Joi.string().required(),
		   street: Joi.string(),
		   ward: Joi.string(),
		   district: Joi.string(),
		   city: Joi.string(),
		   avatar: Joi.string().uri(),
		   active: Joi.number()
		 }),
		}),
		user.createAgent
	   );

	route.get("/", middlewares.isAuth, user.get);
	route.put(
		"/editAgent/:id",
		middlewares.isAuth,
		middlewares.permission("Admin"),
		celebrate({
			body: Joi.object({
				name: Joi.string(),
				phoneNumber: Joi.string(),
				password: Joi.string(),
				group: Joi.string(),
				email: Joi.string(),
				street: Joi.string(),
				ward: Joi.string(),
				district: Joi.string(),
				city: Joi.string(),
			}),
		}),
		user.updateAgent
	);

	route.put(
		"/:id",
		middlewares.isAuth,
		celebrate({
			body: Joi.object({
				name: Joi.string(),
				phoneNumber: Joi.string(),
				password: Joi.string(),
				group: Joi.string(),
				email: Joi.string(),
				street: Joi.string(),
				ward: Joi.string(),
				district: Joi.string(),
				city: Joi.string()
			}),
		}),
		user.update
	);

	route.delete("/:id", middlewares.isAuth,middlewares.permission("Admin"), user.remove);
};
