import { BCRYPT_SALT } from "@/helpers/constants";
import bcrypt, { hashSync } from "bcrypt";

const hashPassword = (password: string) => {
    return hashSync(password, BCRYPT_SALT);
}

export { hashPassword }