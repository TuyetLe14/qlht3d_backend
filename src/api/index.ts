import { Router } from "express";
import auth from "./routers/auth";

export default (): Router => {
	const app = Router();
	auth(app);
	return app;
};
