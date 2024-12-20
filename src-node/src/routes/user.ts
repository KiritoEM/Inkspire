import { Router } from "express";
import { checkBanned, isAuthentificated } from "@/middlewares/auth";
import UserController from "@/controllers/UserController";
import err_hdl from "@/middlewares/error";

const UserRouter: Router = Router();

UserRouter.post(
    "/send_request/:receiverId",
    checkBanned,
    isAuthentificated,
    err_hdl(UserController.sendFollowRequest)
);

UserRouter.put(
    "/accept_follow_request/:requestId/:receiverId",
    checkBanned,
    isAuthentificated,
    err_hdl(UserController.acceptFollowRequest)
);

UserRouter.get(
    "/:userId",
    err_hdl(UserController.getUserById)
);

export default UserRouter;
