import { BCRYPT_SALT } from "@/helpers/constants";
import { hashSync, compare } from "bcrypt";

/**
 * Hashes a plain text password using bcrypt and a predefined salt.
 * 
 * @param password - The plain text password to be hashed.
 * @returns The hashed password as a string.

 */
const hashPassword = (password: string): string => {
    return hashSync(password, BCRYPT_SALT);
}

/**
 * Compares a plain text password against a hashed password.
 * 
 * @param password - The plain text password to be compared.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A boolean indicating if the password matches the hashed password.
 */
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await compare(password, hashedPassword);
}

export { hashPassword, comparePassword }