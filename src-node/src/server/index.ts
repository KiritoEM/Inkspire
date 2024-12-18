import express, { Express, Request, Response } from "express";
import cors from "cors";
import rootRouter from "@/routes";
import fileUpload from "express-fileupload";
import { UPLOAD_OPTIONS } from "@/helpers/constants";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload(UPLOAD_OPTIONS));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json("Server Running !!!");
});

// api
app.use("/node-api", rootRouter);

export default app;
