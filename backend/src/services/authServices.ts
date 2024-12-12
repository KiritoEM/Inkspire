
import { prisma } from "@/database";
import { comparePassword } from "@/lib/password";
import { LoginSchema, SignupSchema } from "@/schemas/SchemaTypes";

/**
 * Checks if a user with the given email already exists in the database.
 * 
 * @param {string} email - The email address to check.
 * @returns {Promise<User | null>} A promise resolving to the user if found, or null if not.
 */
const checkUser = async (email: string) => {
    let account = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return account;
};


/**
 * Creates a new user account in the database with the provided user data.
 * 
 * @param userData - An object containing the user's signup details.
 * @returns A promise resolving to the created user object if successful, or null if the creation failed.
 */
const createAccount = async (userData: SignupSchema): Promise<SignupSchema | null> => {
    const user = await prisma.user.create({
        data: userData
    });

    if (user) {
        return user;
    }

    return null;
};

/**
 * Logs in a user with the provided email and password.
 * 
 * @param {LoginSchema} userData - An object containing the user's email and password.
 * @returns {Promise<User | null>} A promise resolving to the user object if the login is successful, or null if the login fails.
 * @throws {Error} If the user is not found or the password is not valid.
 */
const loginUser = async (userData: LoginSchema) => {
    const account = await checkUser(userData.email);

    if (!account) {
        throw new Error("Account not found !!!");
    }

    const passwordValid = comparePassword(userData.password, account.password);

    if (!passwordValid) {
        throw new Error("Password is not valid !!!");
    }

    return account;
};


export { createAccount, loginUser, checkUser };
