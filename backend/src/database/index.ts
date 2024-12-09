import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkDatabaseConnection = async (): Promise<void> => {
    try {
        await prisma.$connect();
        console.log("Prisma database connected successfully !!!");
    }
    catch (err) {
        console.error("Please make sure your prisma database is running !!!");
    }
}

export { prisma, checkDatabaseConnection };
