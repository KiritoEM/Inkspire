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
