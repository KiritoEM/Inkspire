import { prisma } from "@/database"
import { FollowRequest, User } from "@prisma/client";

/**
 * Create a follow request in the database.
 * @param {String} senderId - The user that sends the follow request
 * @param {String} receiverId - The user that receives the follow request
 * @returns {Promise<FollowRequest | null>} - The created follow request 
 */
const createFollowRequest = async (senderId: number, receiverId: number): Promise<FollowRequest | null> => {
    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

    const followRequest = await prisma.followRequest.create({
        data: {
            receiver: {
                connect: { id: receiver?.id }
            },
            sender: {
                connect: { id: sender?.id }
            }
        }
    })

    return followRequest;
}

const confirmFollowRequest = async (requestId: number, senderId: number, receiverId: number) => {
    const followerRes = await prisma.$transaction(async (tx) => {
        const sender = await prisma.user.findUnique({ where: { id: senderId } });
        const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
        const followRequest = await prisma.followRequest.findUnique({ where: { id: requestId } });

        await tx.followRequest.update({
            where: {
                id: followRequest?.id
            },
            data: {
                status: "ACCEPTED"
            },
            include: {
                receiver: true,
                sender: true
            }
        })

        return await tx.follower.create({
            data: {
                follower: {
                    connect: { id: sender?.id }
                },
                followed: {
                    connect: { id: receiver?.id }
                }
            },
            include: {
                followed: true,
                follower: true
            }
        })
    })

    return followerRes;
}

const readUserById = (id: number): Promise<User | null> => {
    const user = prisma.user.findUnique({
        where: { id },
        include: {
            followed: true,
            followers: true,
            receivedFollowRequest: true,
            sendedFollowRequest: true,
            posts: true
        }
    });

    return user;
}

export default { createFollowRequest, confirmFollowRequest, readUserById }