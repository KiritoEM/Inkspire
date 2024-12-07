import { Router } from "express";
import AuthController from "@/controllers/AuthController";
import { erroHandler as err_hdl } from "@/middlewares/error";

const authRouter: Router = Router();

authRouter.post("/register", err_hdl(AuthController.register));

export default authRouter;