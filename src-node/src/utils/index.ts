import path from "path";

/**
 * Convert an object of key:UploadFileTypes.File to an array 
 * @param obj - Object to convert
 * @returns Array of UploadFileTypes.File
 */
const convertObjectToArray = (obj: { [key: string]: UploadFileTypes.File | undefined }) => {
    return Object.keys(obj).map((key) => obj[key]);
}

/**
 * Format filename 
 * @param fileName - Original filename
 * @returns Formatted filename
 */
const formateFilename = (fileName: string) => {
    const arr = fileName.split(".");
    const fileNameExt = arr.pop();
    const fileNameBasename = arr.join("_").concat(`${new Date()}.${fileNameExt}`);

    return fileNameBasename;
}

export { convertObjectToArray, formateFilename }