import { isAuthentificated } from "@/middlewares/auth";
import { Router } from "express";
import PostController from "@/controllers/PostController";

const PostRouter: Router = Router();

PostRouter.post("/create/:userId", isAuthentificated, PostController.createPost);

export default PostRouter;