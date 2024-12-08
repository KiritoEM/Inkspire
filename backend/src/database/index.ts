import { CustomHttpError } from "@/helpers/HttpError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkDatabaseConnection = async () => {
    try {
        await prisma.$connect();
        console.log("Prisma database connected successfully !!!");
    }
    catch (err) {
        if (err instanceof CustomHttpError) {
            console.error("An error was occured when connecting Prisma database: error details: ", err.details, "error message: ", err.message);
            process.exit(1);
        }
    }
}

export { prisma, checkDatabaseConnection };
