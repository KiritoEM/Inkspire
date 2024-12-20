import { Router } from "express";
import { isAuthentificated } from "@/middlewares/auth";
import UserController from "@/controllers/UserController";
import err_hdl from "@/middlewares/error";

const FollowerRouter: Router = Router();

FollowerRouter.post(
    "/send-request/:toFollowedId",
    isAuthentificated,
    err_hdl(UserController.SendFollowRequest)
);

export default FollowerRouter;
