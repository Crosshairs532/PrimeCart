import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import { primeCartRoutes } from "./app/routes/routes";
import cors from "cors";
import globalError from "./app/utility/globarError";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Prime cart server is running ! 🚀");
});

app.use("/api", primeCartRoutes);

app.use(globalError);
export default app;
