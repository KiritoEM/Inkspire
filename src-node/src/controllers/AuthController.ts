import parseWithSchema from "@/helpers/parseWithSchema";
import { loginSchema, signupSchema } from "@/schemas";
import { Request, Response } from "express";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { EMAIL_TOKEN_SECRET, ERROR_CODE, SUCCESS_CODE, TWO_STEP_HTML } from "@/helpers/constants";
import { hashPassword } from "@/lib/password";
import { createJWT, decodeJWT } from "@/lib/jwt";
import { SignupWithJWT } from "./helpers/types";
import { SignupSchema } from "@/schemas/SchemaTypes";
import { checkUser, createAccount, loginUser } from "@/services/authServices";

/**
 * This function is used to sign up a user with an email that is not already in the database
 * The token is sent by the client in the url, and is used to get the user's informations
 * @param req The request object
 * @param res The response object
 * @returns A response object containing a jwt token that will be used to logIn the user
 */
const signUp = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const { token } = req.params;

    if (!token) {
        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "Not token provided !!!")
    }


    let userPayload = decodeJWT(token, EMAIL_TOKEN_SECRET) as SignupWithJWT;

    const accountExist = await checkUser(userPayload.email);

    if (accountExist) {
        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "User already exist with this email !!!")
    }

    const userData: SignupSchema = {
        email: userPayload.email,
        pseudo: userPayload.pseudo,
        password: hashPassword(userPayload.password),
        location: userPayload.location
    }

    const user = await createAccount(userData);

    if (!user) {
        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when creating user !!!")
    }

    const userToken = createJWT({ ...userData });
    return sendResponse(res, SUCCESS_CODE.CREATED, "Account created successfully !!!", { token: userToken });
}

/**
 * This function is used to sign in a user with the provided email and password.
 * It validates the input data using the login schema and checks if the user exists.
 * If the user is found and the credentials are valid, it generates a JWT token
 * for the user and returns a response with the token.
 * 
 * @param req The request object containing the user's login credentials
 * @param res The response object to send the result of the operation
 * @returns A response object containing a JWT token if the sign-in is successful,
 * or an error message if there was an issue with the credentials
 */
const signIn = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    const accountDetails = req.body;

    const user_vd = parseWithSchema({ data: accountDetails, schema: loginSchema, errorMessage: "An error was occured in loginZodSchema !!!" });

    const user = await loginUser(user_vd);

    if (!user) {
        return sendErrorResponse(res, ERROR_CODE.BAQ_REQUEST, "An error was occured when creating user !!!")
    }

    const userToken = createJWT({ ...user_vd });

    return sendResponse(res, SUCCESS_CODE.CREATED, "User logIn successfully !!!", { token: userToken });
}

export default { signIn, signUp };