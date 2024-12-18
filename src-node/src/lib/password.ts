import { BCRYPT_SALT } from "@/helpers/constants";
import { hashSync, compare } from "bcrypt";

/**
 * Hashes a plain text password using bcrypt
 * 
 * @param {String} password - The plain text password to be hashed.
 * @returns {String} The hashed password 

 */
const hashPassword = (password: string): string => {
    return hashSync(password, BCRYPT_SALT);
}

/**
 * Compares a plain text password against a hashed password.
 * 
 * @param {String} password - The plain text password 
 * @param {String} hashedPassword - The hashed password 
 * @returns {Promise<boolean>} 
 */
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await compare(password, hashedPassword);
}

export { hashPassword, comparePassword }