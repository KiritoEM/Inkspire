import express, { Express, Request, Response } from "express";
import cors from "cors";
import rootRouter from "@/routes";
import fileUpload from "express-fileupload";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json("Server Running !!!");
});

// api
app.use("/node-api", rootRouter);

export default app;
