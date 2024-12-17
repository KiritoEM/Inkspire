import authModule from "@/modules/authModule";
import emailModule from "@/modules/emailModule";
import postModule from "@/modules/postModule";
import { Router } from "express";

const rootRouter: Router = Router();

rootRouter.use("/auth", authModule.router);
rootRouter.use("/email", emailModule.router);
rootRouter.use("/post", postModule.router);

export default rootRouter;