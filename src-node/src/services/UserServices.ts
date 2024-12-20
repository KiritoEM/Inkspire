import { prisma } from "@/database"

const addFollowRequest = async (userId: string, toFollowedId: string) => {
    const res = await prisma.
}

export default { addFollowRequest }