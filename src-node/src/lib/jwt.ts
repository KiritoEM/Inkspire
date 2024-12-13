import { TOKEN_EXPIRED, TOKEN_SECRET } from "@/helpers/constants";
import { JwtPayload, sign, verify } from "jsonwebtoken";

/**
 * Creates a JSON Web Token (JWT) given the payload data
 * @param data the payload data to be encoded into the JWT
 * @param tokenSecret the secret key that will be used to create the JWT
 * @param tokenExpiration the expiration time of the JWT
 * @returns a Promise with the JWT string or an error if the data is empty
 */
const createJWT = (data: JwtPayload, tokenSecret?: string, tokenExpiration?: any) => {
    if (Object.keys(data).length === 0) {
        return new Error("Data cannot be empty for payload !!!");
    }

    const secret = tokenSecret ?? TOKEN_SECRET;
    const expiration = tokenExpiration ?? TOKEN_SECRET;
    return sign(data, secret, expiration);
};

/**
 * Verifies a JWT token given the token and a secret key.
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
