import parseWithSchema from "@/helpers/parseWithSchema";
import { loginSchema } from "@/schemas";
import { Request, Response } from "express";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import { EMAIL_TOKEN_SECRET, ERROR_CODE, SUCCESS_CODE } from "@/helpers/constants";
import { hashPassword } from "@/lib/password";
import { createJWT, decodeJWT } from "@/lib/jwt";
import { SignupWithJWT } from "./helpers/types";
import { SignupSchema } from "@/schemas/SchemaTypes";
import AuthServices from "@/services/authServices";
import { TokenPayload } from "google-auth-library";

/**
 * Create a new account
 * 
 * @param req The request object
 * @param res The response object
 * @returns Response object containing a jwt token 
 */
const signUp = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.params;

    if (!token) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "Not token provided !!!")
    }

    let userPayload = decodeJWT(token, EMAIL_TOKEN_SECRET) as SignupWithJWT;

    if (userPayload instanceof Error) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, userPayload.message);
    }

    const accountExist = await AuthServices.checkUser(userPayload.email);

    if (accountExist) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "User already exist with this email !!!")
    }

    const userData: SignupSchema = {
        email: userPayload.email,
        pseudo: userPayload.pseudo,
        password: hashPassword(userPayload.password),
        location: userPayload.location
    }

    const user = await AuthServices.createAccount(userData);

    if (!user) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "An error was occured when creating user !!!")
    }

    const userToken = createJWT({ ...userData });
    return sendResponse(res, SUCCESS_CODE.CREATED, "Account created successfully !!!", { token: userToken });
}

/**
 * Sign in a user
 * 
 * @param req The request object containing the user's login credentials
 * @param res The response object 
 * @returns Response object containing a JWT token 
 */
const signIn = async (req: Request, res: Response): Promise<Response> => {
    const accountDetails = req.body;

    const user_vd = parseWithSchema({ data: accountDetails, schema: loginSchema, errorMessage: "An error was occured in loginZodSchema !!!" });

    const user = await AuthServices.loginUser(user_vd);

    if (!user) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "An error was occured when creating user !!!")
    }

    const userToken = createJWT({ ...user_vd });

    return sendResponse(res, SUCCESS_CODE.CREATED, "User logIn successfully !!!", { token: userToken });
}

/**
 * Sign in a user using Google 0Auth
 * 
 * @param req The request object containing the 0Auth token
 * @param res The response object 
 * @returns Response object containing a JWT token 
 */
const google0Auth = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.params;

    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const payload = await response.json();

    const user = await AuthServices.signin0Auth(payload as TokenPayload);

    if (!user) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "An error was occured when logIn user with Google0Auth !!!")
    }

    const userToken = createJWT({ ...user });

    return sendResponse(res, SUCCESS_CODE.OK, "User logIn successfully !!!", { token: userToken });
}

export default { signIn, signUp, google0Auth };