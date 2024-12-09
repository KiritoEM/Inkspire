import authModule from "@/modules/authModule";
import { Request, Response, Router } from "express";

const rootRouter: Router = Router();

rootRouter.use("/auth", authModule.router);

export default rootRouter;