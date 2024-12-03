import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import server from "./server";

const app = express();
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Prime cart server is running ! 🚀");
});
export default app;
