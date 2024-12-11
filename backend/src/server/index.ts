import express, { Express, Request, Response } from "express";
import cors from "cors";
import rootRouter from "@/routes";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json("Server Running !!!");
});

//api
app.use("/node-api", rootRouter)

export default app;
