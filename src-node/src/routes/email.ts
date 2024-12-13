import { Request, Response, Router } from "express";
import { erroHandler as err_hdl } from "@/middlewares/error";
import EmailController from "@/controllers/EmailController";

const EmailRouter: Router = Router();

EmailRouter.post("/two_step/send", err_hdl(EmailController.sendAuthEmail));

EmailRouter.get("/", (res: Response) => {
    res.send("EmailRouter test route");
});

export default EmailRouter;