import parseWithSchema from "@/helpers/parseWithSchema";
import { signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { checkUser } from "./helpers/CheckUser";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { EMAIL_TOKEN_SECRET, ERROR_CODE, SUCCESS_CODE, TWO_STEP_HTML } from "@/helpers/constants";
import { prisma } from "@/database";
import { hashPassword } from "@/lib/password";
import { createJWT, decodeJWT } from "@/lib/jwt";
import { sendEmail } from "@/lib/mailing";
import { SignupWithJWT } from "./helpers/types";
import { SignupSchema } from "@/schemas/SchemaTypes";

class AuthController {
    async sendEmail(req: Request, res: Response) {
        const accountDetails = req.body;

        const user_vd = parseWithSchema({ data: accountDetails, schema: signupSchema, errorMessage: "An error was occured in signupZodSchema !!!" });

        const userExist = await checkUser(user_vd.email);

        if (userExist) {
            return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
        }

        const emailToken = createJWT({ ...user_vd }, EMAIL_TOKEN_SECRET);

        const emailSent = sendEmail(user_vd.email, TWO_STEP_HTML(emailToken as string), "Veuillez cliquez sur le bouton ci dessous pour confirmer votre inscription sur Inkspire");

        if (emailSent) {
            return sendResponse(res, SUCCESS_CODE.ACCEPTED, "Email sent successfully !!!", { emailToken });
        }

        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when sending twoStep email !!!");
    }

    async signUp(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { token } = req.params;

        if (!token) {
            return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "Not token provided !!!")
        }

        let userPayload: SignupWithJWT;
        userPayload = decodeJWT(token, EMAIL_TOKEN_SECRET) as SignupWithJWT;

        const userExist = await checkUser(userPayload.email);

        if (userExist) {
            return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
        }

        const userData: SignupSchema = {
            email: userPayload.email,
            pseudo: userPayload.pseudo,
            password: hashPassword(userPayload.password),
            location: userPayload.location
        }

        const user = await prisma.user.create({
            data: userData
        })

        if (!user) {
            return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when creating user !!!")
        }

        const userToken = createJWT({ ...userData });
        return sendResponse(res, SUCCESS_CODE.CREATED, "Account created successfully !!!", { token: userToken });
    }
}

export default new AuthController();