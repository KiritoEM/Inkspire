import { Router } from "express";
import { isAuthentificated } from "@/middlewares/auth";
import upload from "@/middlewares/upload";
import PostController from "@/controllers/PostController";

const PostRouter: Router = Router();

PostRouter.post(
    "/create/:userId",
    isAuthentificated,
    (req, res, next) => upload(req, res, next, {
        fileTypes: "image",
        fileField: "file",
        uploadMethod: "single"
    }),
    PostController.createPost
);

export default PostRouter;
