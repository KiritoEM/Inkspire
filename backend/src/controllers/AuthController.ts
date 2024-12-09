import parseWithSchema from "@/helpers/parseWithSchema";
import { signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { checkUser } from "./helpers/CheckUser";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { ERROR_CODE, SUCCESS_CODE, TWO_STEP_HTML } from "@/helpers/constants";
import { prisma } from "@/database";
import { hashPassword } from "@/lib/password";
import { createJWT } from "@/lib/jwt";
import { sendEmail } from "@/lib/mailing";

class AuthController {
    async sendEmail(req: Request, res: Response) {
        const accountDetails = req.body;

        const user_vd = parseWithSchema({ data: accountDetails, schema: signupSchema, errorMessage: "An error was occured in signupZodSchema !!!" });

        const userExist = await checkUser(user_vd.email);

        if (userExist) {
            return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
        }

        const emailToken = createJWT({ ...user_vd });

        const emailSent = sendEmail(user_vd.email, TWO_STEP_HTML(emailToken as string), "Veuillez cliquez sur le bouton ci dessous pour confirmer votre inscription sur Inkspire");

        if (emailSent) {
            return sendResponse(res, SUCCESS_CODE.CREATED, "Email sent successfully !!!", { emailToken });
        }

        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when sending twoStep email !!!");
    }

    async signUp(req: Request, res: Response) {
        const { token } = req.params;

        if (!token) {

        }
        const user = await prisma.user.create({
            data: {
                ...user_vd,
                password: hashPassword(user_vd.password)
            }
        })
        const token = createJWT({ userId: user.id, role: user.role });
    }
}

export default new AuthController();