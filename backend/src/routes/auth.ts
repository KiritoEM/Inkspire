import { Request, Response, Router } from "express";
import AuthController from "@/controllers/AuthController";
import { erroHandler as err_hdl } from "@/middlewares/error";

const AuthRouter: Router = Router();

// AuthRouter.post("/signup", err_hdl(AuthController.signUp));
AuthRouter.post("/send_email", err_hdl(AuthController.sendEmail));

AuthRouter.get("/", (req: Request, res: Response) => {
    res.send("Auth test route");
});


export default AuthRouter;