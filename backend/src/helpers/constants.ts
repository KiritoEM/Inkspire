export const PORT = process.env.PORT || 3003;

export const BCRYPT_SALT = 12;

export const TOKEN_SECRET = "f0Gamx5LfHZIlHbPXkKP52rTlyGBfvllZQ0rd6c6ppxu0zyIrTukGLJEcYFxmj5g";

export const TOKEN_EXPIRED = { expiresIn: "27d" };

export enum ERROR_CODE {
    BAQ_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502
}

export enum SUCCESS_CODE {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
}

