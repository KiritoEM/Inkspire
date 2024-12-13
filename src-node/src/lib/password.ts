import { BCRYPT_SALT } from "@/helpers/constants";
import { hashSync, compare } from "bcrypt";

/**
 * Hashes a plain text password using bcrypt
 * 
 * @param password - The plain text password to be hashed.
 * @returns The hashed password 

 */
const hashPassword = (password: string): string => {
    return hashSync(password, BCRYPT_SALT);
}

/**
 * Compares a plain text password against a hashed password.
 * 
 * @param password - The plain text password 
 * @param hashedPassword - The hashed password 
 * @returns A boolean 
 */
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await compare(password, hashedPassword);
}

export { hashPassword, comparePassword }