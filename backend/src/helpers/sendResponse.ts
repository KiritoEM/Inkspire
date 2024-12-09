import { Response } from "express";
import { ERROR_CODE, SUCCESS_CODE } from "./constants";

const sendErrorResponse = <T>(res: Response, statusCode: ERROR_CODE, message: string, data?: T) => {
    return res.status(statusCode).json({ message, data });
};

const sendResponse = <T>(res: Response, statusCode: SUCCESS_CODE, message: string, data?: T) => {
    return res.status(statusCode).json({ message, data });
};

export { sendErrorResponse, sendResponse };
