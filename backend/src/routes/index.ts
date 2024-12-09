import authModule from "@/modules/authModule";
import { Router } from "express";

const appRouter: Router = Router();

appRouter.post("/auth", authModule.router);

export default appRouter;