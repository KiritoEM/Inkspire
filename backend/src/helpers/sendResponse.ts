import { Response } from "express";
import { ERROR_CODE, SUCCESS_CODE } from "./constants";

/**
 * Sends an error response with the specified status code and message.
 *
 * @param res - The Express Response object used to send the HTTP response.
 * @param statusCode - The error status code to set for the response.
 * @param message - A descriptive error message to include in the response.
 * @param data - Optional additional data to include in the response.
 * @returns The HTTP response with the specified status code, message, and optional data.
 */
const sendErrorResponse = <T>(res: Response, statusCode: ERROR_CODE, message: string, data?: T) => {
    return res.status(statusCode).json({ message, data });
};


/**
 * Sends a successful response with the specified status code and message.
 *
 * @param res - The Express Response object used to send the HTTP response.
 * @param statusCode - The success status code to set for the response.
 * @param message - A descriptive success message to include in the response.
 * @param data - Optional additional data to include in the response.
 * @returns The HTTP response with the specified status code, message, and optional data.
 */
const sendResponse = <T>(res: Response, statusCode: SUCCESS_CODE, message: string, data?: T) => {
    return res.status(statusCode).json({ message, data });
};

export { sendErrorResponse, sendResponse };
