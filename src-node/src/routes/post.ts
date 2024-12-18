import { Router } from "express";
import { isAuthentificated } from "@/middlewares/auth";
import upload from "@/middlewares/upload";
import PostController from "@/controllers/PostController";
import err_hdl from "@/middlewares/error";

const PostRouter: Router = Router();

PostRouter.post(
    "/create/:userId",
    isAuthentificated,
    (req, res, next) => upload(req, res, next, {
        fileTypes: "image",
        fileField: "picture1",
        uploadMethod: "single"
    }),
    err_hdl(PostController.createPost)
);

export default PostRouter;
