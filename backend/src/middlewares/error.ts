import { CustomHttpError } from "@/helpers/HttpError";
import { NextFunction, Request, Response } from "express"

const erroHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        }
        catch (err) {
            if (err instanceof CustomHttpError) {
                return res.status(err.statusCode).json({
                    err: err.message,
                    details: err.details
                })
            }

            return res.status(500).json({
                error: "Internal Server Error",
                message: err instanceof Error ? err.message : "An unexpected error occurred",
            });
        }
    }
}

export { erroHandler }