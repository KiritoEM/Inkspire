import parseWithSchema from "@/helpers/parseWithSchema";
import { signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { checkUser } from "./helpers/CheckUser";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { ERROR_CODE, SUCCESS_CODE } from "@/helpers/constants";
import { prisma } from "@/database";
import { hashPassword } from "@/lib/password";
import { createJWT } from "@/lib/jwt";

class AuthController {
    async signUp(req: Request, res: Response) {
        const accountDetails = req.body;
        console.log(accountDetails);
        
        const _vd = parseWithSchema({ data: accountDetails, schema: signupSchema, errorMessage: "An error was occured in signupZodSchema !!!" });

        const userExist = await checkUser(_vd.email);

        if (userExist) {
            sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
        }

        const user = await prisma.user.create({
            data: {
                ..._vd,
                password: hashPassword(_vd.password)
            }
        })
        const token = createJWT({ userId: user.id, role: user.role });
        sendResponse(res, SUCCESS_CODE.CREATED, "Account created successfull !!!", { token });
    }
}

export default new AuthController();