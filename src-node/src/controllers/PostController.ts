import parseWithSchema from "@/helpers/parseWithSchema"
import { postSchema } from "@/schemas";
import { Request, Response } from "express"

const createPost = async (req: Request, res: Response): Promise<void> => {
    const postDetails = req.body;

    const post_vd = parseWithSchema({ data: req.body, schema: postSchema, errorMessage: "An error was occured in postZodSchema !!!" });
}

export default { createPost }