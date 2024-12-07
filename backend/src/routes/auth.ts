import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/auth");

export default authRouter;