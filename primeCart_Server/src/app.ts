import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import { primeCartRoutes } from "./app/routes/routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Prime cart server is running ! 🚀");
});

app.use("/api", primeCartRoutes);
export default app;
