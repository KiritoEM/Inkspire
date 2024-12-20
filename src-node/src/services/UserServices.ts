import { prisma } from "@/database"
import { FollowRequest } from "@prisma/client";

const createFollowRequest = async (senderId: number, receiverId: number): Promise<FollowRequest | null> => {
    const followRequest = await prisma.followRequest.create({
        data: {
            receiver: {
                connect: { id: receiverId }
            },
            sender: {
                connect: { id: senderId }
            }
        }
    })

    return followRequest;
}

export default { createFollowRequest }