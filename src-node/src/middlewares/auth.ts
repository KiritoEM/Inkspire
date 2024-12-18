import { ERROR_CODE } from "@/helpers/constants";
import { sendErrorResponse } from "@/helpers/sendResponse"
import { NextFunction, Request, Response } from "express"

const isAuthentificated = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader || !bearerHeader?.startsWith(("Bearer"))) {
        return sendErrorResponse(res, ERROR_CODE.UNAUTHORIZED, "Unauthorized : Missing or invalid token  !!!");
    }

    const token = bearerHeader?.split(" ")[1];

    if (!token) {
        return sendErrorResponse(res, ERROR_CODE.UNAUTHORIZED, "Unauthorized : Token not provided !!!");
    }

    next();
}

export { isAuthentificated }