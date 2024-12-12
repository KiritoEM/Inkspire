import { Request, Response, Router } from "express";
import AuthController from "@/controllers/AuthController";
import { erroHandler as err_hdl } from "@/middlewares/error";

const AuthRouter: Router = Router();

AuthRouter.post("/signup/:token", err_hdl(AuthController.signUp));
AuthRouter.post("/signin", err_hdl(AuthController.signIn));

AuthRouter.get("/", (req: Request, res: Response) => {
    res.send("Auth test route");
});

export default AuthRouter;