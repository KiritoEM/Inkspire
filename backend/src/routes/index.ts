import { Router } from "express";
import authRouter from "./auth";

const appRouter: Router = Router();

appRouter.post("/auth", authRouter);

export default appRouter;