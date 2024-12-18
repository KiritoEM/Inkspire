export const PORT = process.env.PORT || 3003;

export const BCRYPT_SALT = 12;

export const TOKEN_SECRET = "f0Gamx5LfHZIlHbPXkKP52rTlyGBfvllZQ0rd6c6ppxu0zyIrTukGLJEcYFxmj5g";

export const EMAIL_TOKEN_SECRET = "KmGzkxV7gcHWGr0dI5bUU0MUB3425TAT4Y6eCU1zYZ5lUXvJQMOtGiD4D0LOvAwx";

export const PASSWORD_0AUTH = "miiU3IkjGsTrfqu3YJCsxZbzjGVuK6jBDZcAmu7"

export const TOKEN_EXPIRED = { expiresIn: "27d" };

export const EMAIL_TOKEN_EXPIRED = { expiresIn: "365d" };

export const TWO_STEP_HTML = (token: string) => {
    return (
        `
        <div>
                <a href="${process.env.FRONT_URL}/signup/finalization/${token}" style="" target="_blank">Confirmer votre inscription</a>
        </div>
    `
    )
}

export enum ERROR_CODE {
    BAQ_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    INVALID_FILE_TYPE = 422
}

export enum SUCCESS_CODE {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
}

export const UPLOAD_OPTIONS = {
    limits: { fileSize: 50 * 1024 * 1024 },
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif", "image/svg+xml"];

export const ALLOWED_VIDEOS_TYPES = ["video/mpeg", "video/quicktime", "image/webm"];

export const ALLOWED_PDF_TYPES = ["application/pdf"];

export const ALL_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_PDF_TYPES, ...ALLOWED_VIDEOS_TYPES];

export const FILE_UPLOAD_TYPES_VALUES = ["image", "video", "pdf", "other"] as const;



