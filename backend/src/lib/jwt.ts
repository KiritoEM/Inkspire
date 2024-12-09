import { TOKEN_EXPIRED, TOKEN_SECRET } from "@/helpers/constants";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const createJWT = (data: JwtPayload, tokenSecret?: string) => {
    if (Object.keys(data).length === 0) {
        return new Error("Data cannot be empty for payload !!!");
    }

    const secret = tokenSecret ?? TOKEN_SECRET;
    return sign(data, secret, TOKEN_EXPIRED);
};

const decodeJWT = (token: string, tokenSecret?: string) => {
    if (!token) {
        return new Error("Token cannot be empty !!!");
    }

    const secret = tokenSecret ?? TOKEN_SECRET;
    return verify(token, secret);
}

export { createJWT, decodeJWT };
