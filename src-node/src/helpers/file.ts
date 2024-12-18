import { ALL_TYPES, ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPES, ALLOWED_VIDEOS_TYPES } from "./constants";
import { FileUploadTypes } from "./types";

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

export { verifyFileType }