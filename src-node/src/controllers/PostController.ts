import { ERROR_CODE, SUCCESS_CODE } from "@/helpers/constants";
import parseWithSchema from "@/helpers/parseWithSchema";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { postSchema } from "@/schemas";
import PostServices from "@/services/PostServices";
import { convertObjectToArray } from "@/utils";
import { Request, Response } from "express";


/**
 * Creates a new post for a user.
 *
 * @param {Request} req - The request object 
 * @param {Response} res - The response object 
 * @returns {Promise<Response>} - A response object containing the created post
 */

const createPost = async (req: Request, res: Response): Promise<Response> => {
    const postDetails = req.body;
    const { userId } = req.params;

    const isMultipart = Array.isArray(req.files) || Object.keys(req.files).length > 1;
    const files: UploadFileTypes.File[] = isMultipart
        ? convertObjectToArray(req.files) as UploadFileTypes.File[]
        : [req.files as unknown as UploadFileTypes.File];

    const post_vd = parseWithSchema({
        data: postDetails,
        schema: postSchema,
        errorMessage: "Validation error in post schema!"
    });

    const post = await PostServices.saveNewPost(post_vd, parseInt(userId), files);

    if (!post) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "Error occurred while creating the post !!!");
    }

    return sendResponse(res, SUCCESS_CODE.CREATED, "Post created successfully!", post);
};

export default { createPost };
