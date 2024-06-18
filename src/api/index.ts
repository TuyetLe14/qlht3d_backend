import { Router } from "express";
import auth from "./routers/auth";
import user from "./routers/user";
import conservation from "./routers/conservation";
import heritage from "./routers/heritage";
import imgheritage from "./routers/imgheritage";
import order from "./routers/order";
import payment from "./routers/payment";
import review from "./routers/review";
import titket from "./routers/titket";


export default (): Router => {
	const app = Router();
	auth(app);
	user(app);
	conservation(app);
	heritage(app);
	imgheritage(app);
	order(app);
	payment(app);
	review(app);
	titket(app);
	
	return app;
};
