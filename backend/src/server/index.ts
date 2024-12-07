import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { GraphqlServer, startGraphql } from "graphql";

config();

const app: Express = express();

app.use(express.json());
app.use(cors());


app.get("/", (req: Request, res: Response) => {
  res.send("Server Running !!!");
});

export default app;
