import { formateFilename } from "@/utils";
import { ALL_TYPES, ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPES, ALLOWED_VIDEOS_TYPES } from "./constants";
import { FileUploadTypes } from "./types";

/**
 * Verify if the given mimetype is allowed for the given fileType.
 *
 * @param fileType - The type of file 
 * @param mimetype - The mimetype of the file
 * @returns Boolean
 */
const verifyFileType = (fileType: FileUploadTypes, mimetype: string): boolean => {
    switch (fileType) {
        case "image":
            return ALLOWED_IMAGE_TYPES.includes(mimetype);

        case "video":
            return ALLOWED_VIDEOS_TYPES.includes(mimetype);

        case "pdf":
            return ALLOWED_PDF_TYPES.includes(mimetype);

        case "other":
            return ALL_TYPES.includes(mimetype);

        default:
            break;
    }

    return false;
}

/**
 * Uploads a file 
 * 
 * @param file - The file to be uploaded
 * @param path - The path where the file should be uploaded
 * 
 * @throws Error 
 */
const uploadFile = (file: UploadFileTypes.File, path: string) => {
    file.mv(`${path}/${formateFilename(file.name)}`, (err) => {
        if (err) {
            throw new Error(`An error was occured when uploading file !!!); ${err}`);
        }

        console.log("File uploaded successfully");
    })
}

export { verifyFileType, uploadFile }