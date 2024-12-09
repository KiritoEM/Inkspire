import { BCRYPT_SALT } from "@/helpers/constants";
import bcrypt, { hashSync, compare } from "bcrypt";

const hashPassword = (password: string): string => {
    return hashSync(password, BCRYPT_SALT);
}

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await compare(password, hashedPassword);
}

export { hashPassword, comparePassword }