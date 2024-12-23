import { TOKEN_EXPIRED, TOKEN_SECRET } from "@/helpers/constants";
import { JsonWebTokenError, JwtPayload, NotBeforeError, sign, TokenExpiredError, verify } from "jsonwebtoken";

/**
 * Creates a JSON Web Token (JWT)
 * 
 * @param {JwtPayload} data the payload data 
 * @param {String} tokenSecret the secret key 
 * @param {{ expiresIn: String }} tokenExpiration the expiration time of the JWT
 * @returns {Promise<String>}
 */
const createJWT = (data: JwtPayload, tokenSecret?: string, tokenExpiration?: { expiresIn: string }) => {
    if (Object.keys(data).length === 0) {
        return new Error("Data cannot be empty for payload !!!");
    }

    const secret = tokenSecret ?? TOKEN_SECRET;
    const expiration = tokenExpiration ?? TOKEN_EXPIRED;

    return sign(data, secret, expiration);
};

/**
 * Verifies a JWT token
 * 
 * @param {String} token the JWT token to verify
 * @param {String} tokenSecret -  the secret key 
 * @returns {JWTPayload}
 */
const decodeJWT = (token: string, tokenSecret?: string) => {
    try {
        if (!token) {
            return new Error("Token cannot be empty !!!");
        }

        const secret = tokenSecret ?? TOKEN_SECRET;
        return verify(token, secret);
    }
    catch (err) {
        if (err instanceof TokenExpiredError) {
            return new Error("Token expired !!!");
        }

        if (err instanceof JsonWebTokenError) {
            return new Error("JWT malformed !!!");
        }

        if (err instanceof NotBeforeError) {
            return new Error("JWT not active !!!");
        }
    }
}

export { createJWT, decodeJWT };
