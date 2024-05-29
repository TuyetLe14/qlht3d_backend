import dotenv from "dotenv-safe";
import express from "express";
import loaders from "./loaders";

dotenv.config();

import "../jwk.dev.json";
import "../jwk.production.json";
import "../config/database";

const app = express();
loaders({ expressApp: app });

app.listen(process.env.PORT, () => {
	console.log(
		`3D-Heritages Platform app listening at http://localhost:${process.env.PORT}`
	);
});
