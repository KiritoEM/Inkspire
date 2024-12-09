import parseWithSchema from "@/helpers/parseWithSchema";
import { signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { EMAIL_TOKEN_SECRET, ERROR_CODE, SUCCESS_CODE, TWO_STEP_HTML } from "@/helpers/constants";
import { createJWT, decodeJWT } from "@/lib/jwt";
import { sendEmail } from "@/lib/mailing";
import { checkUser } from "@/services/authServices";

class EmailController {
    async sendEmail(req: Request, res: Response) {
        const accountDetails = req.body;

        const user_vd = parseWithSchema({ data: accountDetails, schema: signupSchema, errorMessage: "An error was occured in signupZodSchema !!!" });

        const accountExist = await checkUser(user_vd.email);

        if (accountExist) {
            return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
        }

        const emailToken = createJWT({ ...user_vd }, EMAIL_TOKEN_SECRET);

        const emailSent = sendEmail(user_vd.email, TWO_STEP_HTML(emailToken as string), "Veuillez cliquez sur le bouton ci dessous pour confirmer votre inscription sur Inkspire");

        if (emailSent) {
            return sendResponse(res, SUCCESS_CODE.ACCEPTED, "Email sent successfully !!!", { emailToken });
        }

        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when sending twoStep email !!!");
    }
}

export default new EmailController();