import { Request, Response, Router } from "express";
import err_hdl from "@/middlewares/error";
import EmailController from "@/controllers/EmailController";

const EmailRouter: Router = Router();

//send two_step auth email
EmailRouter.post("/two_step/send", err_hdl(EmailController.sendAuthEmail));

//test
EmailRouter.get("/", (res: Response) => {
    res.send("EmailRouter test route");
});

export default EmailRouter;