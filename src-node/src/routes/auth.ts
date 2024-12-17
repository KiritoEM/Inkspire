import { Request, Response, Router } from "express";
import AuthController from "@/controllers/AuthController";
import err_hdl from "@/middlewares/error";

const AuthRouter: Router = Router();

AuthRouter.post("/signup/:token", err_hdl(AuthController.signUp));
AuthRouter.post("/signin", err_hdl(AuthController.signIn));
AuthRouter.post("/google_auth/:token", err_hdl(AuthController.google0Auth));

AuthRouter.get("/", (res: Response) => {
    res.send("Auth test route");
});

export default AuthRouter;