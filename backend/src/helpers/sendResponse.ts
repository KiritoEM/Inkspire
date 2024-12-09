import { Response } from "express"
import { ERROR_CODE, SUCCESS_CODE } from "./constants"

const sendErrorResponse = <T>(res: Response, statusCode: ERROR_CODE, message: string, rest?: T) => {
    res.status(statusCode).json({ message, rest })
}

const sendResponse = <T>(res: Response, statusCode: SUCCESS_CODE, message: string, rest?: T) => {
    res.status(statusCode).json({ message, rest })
}

export { sendErrorResponse, sendResponse }