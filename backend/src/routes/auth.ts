import { Router } from "express";
import AuthController from "@/controllers/AuthController";
import { erroHandler as err_hdl } from "@/middlewares/error";

const AuthRouter: Router = Router();

AuthRouter.post("/register", err_hdl(AuthController.signUp));

export default AuthRouter;