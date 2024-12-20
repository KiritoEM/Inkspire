import { prisma } from "@/database"
import { FollowRequest, RequestStatus, User } from "@prisma/client";

const readUserById = (id: number): Promise<User | null> => {
    const user = prisma.user.findUnique({
        where: { id },
        include: {
            followed: {
                include: {
                    followed: true
                }
            },
            followers: {
                include: {
                    follower: true,
                }
            },
            receivedFollowRequest: {
                include: {
                    sender: true
                }
            },
            sendedFollowRequest: {
                include: {
                    receiver: true
                }
            },
            posts: true
        }
    });

    return user;
}

/**
 * Create a follow request in the database.
 * @param {String} senderId - The user that sends the follow request
 * @param {String} receiverId - The user that receives the follow request
 * @returns {Promise<FollowRequest | null>} - The created follow request 
 */
const createFollowRequest = async (senderId: number, receiverId: number): Promise<FollowRequest | null> => {
    const followRequest = await prisma.$transaction(async (tx) => {
        const sender = await tx.user.findUnique({ where: { id: senderId } })
        const receiver = await tx.user.findUnique({ where: { id: receiverId } })

        return await tx.followRequest.create({
            data: {
                receiver: {
                    connect: { id: receiver?.id }
                },
                sender: {
                    connect: { id: sender?.id }
                }
            }
        })
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
                status: RequestStatus.ACCEPTED
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

export default { createFollowRequest, confirmFollowRequest, readUserById }