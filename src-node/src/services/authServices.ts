
import { prisma } from "@/database";
import { PASSWORD_0AUTH } from "@/helpers/constants";
import { comparePassword } from "@/lib/password";
import { LoginSchema, SignupSchema } from "@/schemas/SchemaTypes";
import { User } from "@prisma/client";
import { TokenPayload } from "google-auth-library";

/**
 * Checks if a user with the given email already exists in the database.
 * 
 * @param {string} email - The email address to check.
 * @returns {Promise<User | null>} A promise resolving to the user object
 */
const checkUser = async (email: string): Promise<User | null> => {
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
 * @returns A promise resolving to the created user object 
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
 * @returns {Promise<User | null>} A promise resolving to the user object 
 * @throws {Error} User not found or password not valid.
 */
const loginUser = async (userData: LoginSchema): Promise<User | null> => {
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

/**
 * Sign In a user with 0Auth
 * @param {TokenPayload} payload - The 0auth payload provided by user.
 * @returns {Promise<User | null>} A promise resolving to the user object
 * @throws {Error} If the signin fails.
 */
const signin0Auth = async (payload: TokenPayload): Promise<User | null> => {
    let user = await prisma.user.findUnique({
        where: {
            email: payload?.email,
            avatar: payload?.picture,
            password: PASSWORD_0AUTH
        }
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: payload?.email as string,
                pseudo: payload?.name as string,
                avatar: payload?.picture as string,
                password: PASSWORD_0AUTH,
            }
        })

        return user;
    }

    return user;
}


export default { createAccount, loginUser, checkUser, signin0Auth };
