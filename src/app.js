import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import rootRouter from "./routes/index.js";
app.use("/api/v1", rootRouter);

app.use(errorHandler);

export default app;
