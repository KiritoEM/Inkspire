import { NODE_LOCAL_URL } from "../helpers/constants";
import { Response } from "../helpers/types";
import { LoginSchemaTypes, SignupSchemaTypes } from "../lib/form-validation/types";
import axios from "axios";

/**
 * Logs a user in with the provided email and password.
 *
 * @param data Object containing the user's email and password.
 * @returns A response object with a success status and a JWT token 
 */
const LOGIN = async <T>(data: LoginSchemaTypes): Promise<Response<T>> => {
    try {
        const response = await axios.post(`${NODE_LOCAL_URL}/node-api/auth/signin`, data);

        if (response.status === 200) {
            return {
                status: "success",
                message: "Login successful",
                data: response.data as T,
            };
        }

        return {
            status: "error",
            message: "An error occurred when logging in.",
        };
    } catch (err) {
        console.error("Internal server error:", err);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
};

/**
 * Sends a signup request to the server with the provided user data.
 *
 * @param data Object containing the user's signup information.
 * @returns A response object with a success status and a message.
 */
const SIGNUP = async <T>(data: SignupSchemaTypes): Promise<Response<T>> => {
    try {
        console.log(data)
        const response = await axios.post(`${NODE_LOCAL_URL}/node-api/email/two_step/send`, data);

        if (response.status === 200) {
            console.log(response.data)
            return {
                status: "success",
                message: "Email verification sent successfully !!!",
                data: response.data as T,
            };
        }  

        console.log(response.data) 

        return {
            status: "error",
            message: "An error occurred when signup",
        };
    } catch (err) {
        console.error("Internal server error:", err);
        return {
            status: "error",
            message: "Internal server error",
        };
    }
};

export default { LOGIN, SIGNUP };
