import { prisma } from "@/database";

const checkUser = async (email: string) => {
    let userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return userExist;
};

export { checkUser };
