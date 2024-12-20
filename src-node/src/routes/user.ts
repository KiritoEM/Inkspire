import { Router } from "express";
import { checkBanned, isAuthentificated } from "@/middlewares/auth";
import UserController from "@/controllers/UserController";
import err_hdl from "@/middlewares/error";

const UserRouter: Router = Router();

//send_follow_request to an user
UserRouter.post(
    "/send_request/:receiverId",
    checkBanned,
    isAuthentificated,
    err_hdl(UserController.sendFollowRequest)
);

//accept_request of an user
UserRouter.put(
    "/accept_follow_request/:requestId/:senderId",
    checkBanned,
    isAuthentificated,
    err_hdl(UserController.acceptFollowRequest)
);

//get user_informations by his id
UserRouter.get(
    "/:userId",
    err_hdl(UserController.getUserById)
);

export default UserRouter;
