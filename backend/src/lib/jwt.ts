import { TOKEN_EXPIRED, TOKEN_SECRET } from "@/helpers/constants";
import { JwtPayload, sign } from "jsonwebtoken"

const createJWT = (data: JwtPayload) => {
    if (Object.keys(data).length === 0) {
        return new Error("Data cannot be empty for paylod !!!");
    }

    return sign(data, TOKEN_SECRET, TOKEN_EXPIRED);
}

export { createJWT }