
import { prisma } from "@/database";
import { comparePassword } from "@/lib/password";
import { LoginSchema, SignupSchema } from "@/schemas/SchemaTypes";

const checkUser = async (email: string) => {
    let account = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return account;
};


const createAccount = async (userData: SignupSchema): Promise<SignupSchema | null> => {
    const user = await prisma.user.create({
        data: userData
    });

    if (user) {
        return user;
    }

    return null;
};

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
