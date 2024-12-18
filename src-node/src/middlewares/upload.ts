import { ERROR_CODE, FILE_UPLOAD_TYPES_VALUES } from "@/helpers/constants";
import { verifyFileType } from "@/helpers/file";
import { sendErrorResponse } from "@/helpers/sendResponse";
import { FileUploadTypes } from "@/helpers/types";
import { NextFunction, Request, Response } from "express";

type FileUploadOptions = {
    fileTypes: FileUploadTypes;
    fileField?: string;
    uploadMethod?: "multiple" | "single";
};

/**
 * Middleware to handle file upload.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @param {FileUploadOptions} options - The options object containing
 *   - fileTypes - The type of files 
 *   - fileField - The name of the input field 
 *   - uploadMethod - The upload method
 *
 * @returns {Promise<Reponse | void>}
 */
const upload = async (
    req: Request,
    res: Response,
    next: NextFunction,
    options: FileUploadOptions
): Promise<Response | void> => {
    if (!req.files || typeof req.files !== "object") {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No file uploaded !!!");
    }

    if (options.uploadMethod === "single") {
        const file = req.files[options.fileField as string];

        if (!file) {
            return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "File not found in the uploaded files.");
        }

        if (!verifyFileType(options.fileTypes, (file.mimetype).toLowerCase())) {
            return sendErrorResponse(res, ERROR_CODE.INVALID_FILE_TYPE, "Invalid file type.");
        }
    }
    else if (options.uploadMethod === "multiple") {
        for (const [imageField, file] of Object.entries(req.files)) {
            if (!verifyFileType("other", ((file?.mimetype as string).toLowerCase()))) {
                return sendErrorResponse(res, ERROR_CODE.INVALID_FILE_TYPE, `Please upload only file with types: "${FILE_UPLOAD_TYPES_VALUES.join(", ")}"`);
            }
        }
    }

    next();
};

export default upload;
