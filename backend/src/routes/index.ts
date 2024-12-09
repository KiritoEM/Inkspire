import authModule from "@/modules/authModule";
import emailModule from "@/modules/emailModule";
import { Router } from "express";

const rootRouter: Router = Router();

rootRouter.use("/auth", authModule.router);
rootRouter.use("/email", emailModule.router);

export default rootRouter;