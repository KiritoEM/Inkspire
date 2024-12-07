import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server";
import { startStandaloneServer } from "@apollo/server/standalone";

config();

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running !!!");
});

export default app;
