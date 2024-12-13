import { TOKEN_EXPIRED, TOKEN_SECRET } from "@/helpers/constants";
import { JsonWebTokenError, JwtPayload, NotBeforeError, sign, TokenExpiredError, verify } from "jsonwebtoken";

/**
 * Creates a JSON Web Token (JWT) given the payload data
 * @param data the payload data to be encoded into the JWT
 * @param tokenSecret the secret key that will be used to create the JWT
 * @param tokenExpiration the expiration time of the JWT
 * @returns a Promise with the JWT string or an error if the data is empty
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
 * Verifies a JWT token given the token and a secret key.
 * @param token the JWT token to verify
 * @param tokenSecret the secret key that will be used to verify the token
 * @returns the decoded payload of the JWT token or an error if the token is invalid
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
