import { HttpException } from "@/helpers/HttpException";
import { NextFunction, Request, Response } from "express"

/**
 * Middleware error handler.
 *
 * This middleware catches all errors and sends them back to the client
 * with the appropriate status code.
 *
 * @param {Function} method The method to wrap with error handling.
 * @returns {Function} A middleware function that handles errors.
 */
const erroHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        }
        catch (err) {
            if (err instanceof HttpException) {
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
        finally {
            ("=============== no error in middleware ===============");
        }
    }
}

export { erroHandler }