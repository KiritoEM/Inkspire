import express, { Express, Request, Response } from "express";
import { config } from "dotenv";

config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running !!!");
});

export default app;
