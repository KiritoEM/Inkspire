import { Router } from "express";
import { checkBanned, isAuthentificated } from "@/middlewares/auth";
import upload from "@/middlewares/upload";
import PostController from "@/controllers/PostController";
import err_hdl from "@/middlewares/error";

const PostRouter: Router = Router();

//create a new post
PostRouter.post(
    "/create/:userId",
    checkBanned,
    isAuthentificated,
    (req, res, next) => upload(req, res, next, {
        fileTypes: "image",
        uploadMethod: "multiple",
        optional: true
    }),
    err_hdl(PostController.createPost)
);

export default PostRouter;
