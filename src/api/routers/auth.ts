import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import middlewares from "../middlewares";
import auth from "../../app/controllers/auth";

const route = Router();

export default (app: Router): void => {
  app.use(route);
  route.post(
    "/signUp",
    celebrate({
      body: Joi.object({
        password: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().allow("", null),
        name: Joi.string(),
        avatar: Joi.string().uri(),
      }),
    }),
    auth.signUp
  );

  route.get(
    "/confirmAccount",
    celebrate({
      query: Joi.object({
        email: Joi.string().required(),
        code: Joi.string().required(),
      }),
    }),
    auth.confirmAccount
  );
  route.get(
    "/newConfirmAccount",
    celebrate({
      query: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    auth.newConfirmAccount
  );
  route.post(
    "/signIn",
    celebrate({
      body: Joi.object({
        password: Joi.string().min(8).required(),
        username: Joi.string().min(8).required(),
      }),
    }),
    auth.signIn
  );
  route.post(
    "/refreshToken",
    celebrate({
      body: Joi.object({
        refreshToken: Joi.string().required(),
      }),
    }),
    auth.refreshToken
  );
  route.post(
    "/changePassword",
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        newPassword: Joi.string().min(8).required(),
        oldPassword: Joi.string().min(8).required(),
      }),
    }),
    auth.changePassword
  );
  route.post(
    "/forgotPassword",
    celebrate({
      body: Joi.object({
        username: Joi.string().email().required(),
      }),
    }),
    auth.forgotPassword
  );
  route.post(
    "/confirmForgotPassword",
    celebrate({
      body: Joi.object({
        username: Joi.string()
          .regex(/^[+@.a-zA-Z0-9]+$/)
          .required(),
        password: Joi.string().min(8).required(),
        confirmationCode: Joi.string().required(),
      }),
    }),
    auth.confirmForgotPassword
  );
  route.post(
    "/signOut",
    celebrate({
      body: Joi.object({
        did: Joi.string(),
      }).unknown(),
    }),
    middlewares.isAuth,
    auth.signOut
  );
};
