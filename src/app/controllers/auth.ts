import { Request, Response, NextFunction } from "express";

import auth from "../services/auth";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ret = await auth.signUp(req.body);
    return res.json({ data: ret });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};

const confirmAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.query;
    console.log(email);
    const rslt = await auth.confirmAccount(email as string, code as string);
    return res.send(rslt.message);
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rslt = await auth.signIn(req.body.username, req.body.password);
    return res.json({ data: rslt });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};


const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rslt = await auth.refreshToken(req.body.refreshToken);
    return res.json({ data: rslt });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};


const changePassword = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const ret = await auth.changePassword(req.user, oldPassword, newPassword);

    return res.json({ data: ret });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};


const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;

    const ret = await auth.forgotPassword(username);

    return res.json({ data: ret });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};


const confirmForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ret = await auth.confirmForgotPassword(req.body);
    return res.json({ data: ret });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};
const signOut = async (req: any, res: Response, next: NextFunction) => {
  try {
    const ret = await auth.signOut(req.user.id, req.body);
    return res.json({ data: ret });
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};


const newConfirmAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;

    const ret = await auth.newConfirmAccount(email as string);
    return res.send(ret.message);
  } catch (err) {
    err.status = err.status || 400;
    return next(err);
  }
};

export default {
  signUp,
  signIn,
  confirmAccount,
  refreshToken,
  changePassword,
  forgotPassword,
  confirmForgotPassword,
  signOut,
  newConfirmAccount,
};
