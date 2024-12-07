import express, { Express, Request, Response } from "express";
import { config } from "dotenv";

config();

const app: Express = express();

app.use(express.json());

// app.use("/graphql", graphqlHTTP({}));

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running !!!");
});

export default app;
