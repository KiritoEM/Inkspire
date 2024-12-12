import { TOKEN_EXPIRED, TOKEN_SECRET } from "@/helpers/constants";
import { JwtPayload, sign, verify } from "jsonwebtoken";

/**
 * Creates a new JWT token with given data and token secret.
 * @param data the payload that will be encrypted in the JWT token
 * @param tokenSecret the secret key that will be used to sign the token
 * @returns the JWT token or an error if the data is empty
 */
const createJWT = (data: JwtPayload, tokenSecret?: string) => {
    if (Object.keys(data).length === 0) {
        return new Error("Data cannot be empty for payload !!!");
    }

    const secret = tokenSecret ?? TOKEN_SECRET;
    return sign(data, secret, TOKEN_EXPIRED);
};

/**
 * Verifies a JWT token given the token and a secret key.
 * If the given secret key is empty, it will use the default secret key.
 * @param token the JWT token to verify
 * @param tokenSecret the secret key that will be used to verify the token
 * @returns the decoded payload of the JWT token or an error if the token is invalid
 */
const decodeJWT = (token: string, tokenSecret?: string) => {
    if (!token) {
        return new Error("Token cannot be empty !!!");
    }

    const secret = tokenSecret ?? TOKEN_SECRET;
    return verify(token, secret);
}

export { createJWT, decodeJWT };
