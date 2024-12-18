import path from "path";

const convertObjectToArray = (obj: { [key: string]: UploadFileTypes.File | undefined }) => {
    return Object.keys(obj).map((key) => obj[key]);
}

const formateFilename = (fileName: string) => {
    const arr = fileName.split(".");
    const fileNameExt = arr.pop();
    const fileNameBasename = arr.join("_").concat(`${new Date()}.${fileNameExt}`);

    return fileNameBasename;
}

export { convertObjectToArray, formateFilename }