import authModule from "@/modules/authModule";
import emailModule from "@/modules/emailModule";
import userModule from "@/modules/userModule";
import postModule from "@/modules/userModule";
import { Router } from "express";

const rootRouter: Router = Router();

rootRouter.use("/auth", authModule.router);
rootRouter.use("/email", emailModule.router);
rootRouter.use("/post", postModule.router);
rootRouter.use("/user", userModule.router);

export default rootRouter;