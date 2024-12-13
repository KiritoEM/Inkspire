import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Checks if the prisma database is connected
 *
 * @returns {Promise<void>} Resolves if the database is connected
 */
const checkDatabaseConnection = async (): Promise<void> => {
    try {
        await prisma.$connect();
        ("Prisma database connected successfully !!!");
    }
    catch (err) {
        console.error("Please make sure your prisma database is running !!!");
    }
}

export { prisma, checkDatabaseConnection };
