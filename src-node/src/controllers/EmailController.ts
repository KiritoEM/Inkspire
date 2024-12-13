import parseWithSchema from "@/helpers/parseWithSchema";
import { signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { EMAIL_TOKEN_EXPIRED, EMAIL_TOKEN_SECRET, ERROR_CODE, SUCCESS_CODE, TWO_STEP_HTML } from "@/helpers/constants";
import { createJWT } from "@/lib/jwt";
import { sendEmail } from "@/lib/mailing";
import AuthServices from "@/services/authServices";

/**
 * Send a two step verification email to the user
 * 
 * @param req The request object
 * @param res The response object
 * @returns A response object containing a jwt token 
 */
const sendAuthEmail = async (req: Request, res: Response): Promise<Response> => {
    const accountDetails = req.body;

    const user_vd = parseWithSchema({ data: accountDetails, schema: signupSchema, errorMessage: "An error was occured in signupZodSchema !!!" });

    const accountExist = await AuthServices.checkUser(user_vd.email);

    (user_vd)

    if (accountExist) {
        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
    }

    const emailToken = createJWT({ ...user_vd }, EMAIL_TOKEN_SECRET, EMAIL_TOKEN_EXPIRED);

    const emailSent = sendEmail(user_vd.email, TWO_STEP_HTML(emailToken as string), "Veuillez cliquez sur le bouton ci dessous pour confirmer votre inscription sur Inkspire");

    ("send")
    if (await emailSent) {
        return sendResponse(res, SUCCESS_CODE.OK, "Email sent successfully !!!", { emailToken });
    }

    return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when sending twoStep email !!!");
}

export default { sendAuthEmail }