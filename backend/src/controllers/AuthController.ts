import parseWithSchema from "@/helpers/parseWithSchema";
import { signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { checkUser } from "./helpers/CheckUser";
import { sendErrorResponse } from "@/helpers/sendResponse";
import { ERROR_CODE } from "@/helpers/constants";

class AuthController {
    async signUp(req: Request, res: Response) {
        const accountDetails = req.body;
        const _vd = parseWithSchema({ data: accountDetails, schema: signupSchema, errorMessage: "An error was occured in signupZodSchema !!!" });

        const user = await checkUser(_vd.email);

        if (user) {
            sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
        }

    }
}

export default new AuthController();