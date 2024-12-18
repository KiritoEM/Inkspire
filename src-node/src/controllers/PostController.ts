import { ERROR_CODE, SUCCESS_CODE } from "@/helpers/constants";
import parseWithSchema from "@/helpers/parseWithSchema"
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { postSchema } from "@/schemas";
import postServices from "@/services/postServices";
import { Request, Response } from "express";

const createPost = async (req: Request, res: Response): Promise<Response> => {
    const postDetails = req.body;
    const { userId } = req.params;

    // const post_vd = parseWithSchema({ data: postDetails, schema: postSchema, errorMessage: "An error was occured in postZodSchema !!!" });

    // const post = await postServices.saveNewPost(post_vd, parseInt(userId));

    // if (!post) {
    //     return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when creating user !!!")
    // }

    return sendResponse(res, SUCCESS_CODE.CREATED, "Post created successfully !!!");
}

export default { createPost }