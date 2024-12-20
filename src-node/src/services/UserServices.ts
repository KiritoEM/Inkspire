import { prisma } from "@/database"
import { FollowRequest, RequestStatus, User } from "@prisma/client";

/**
 * Find a user by its id and include all the relevant data.
 * 
 * @param {String} id The id of the user to find
 * @returns {Promise<User | null>} The user with all the included data
 */
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

/**
 * Confirms a follow request 
 * 
 * @param {number} requestId - The ID of the follow request to confirm.
 * @param {number} senderId - The ID of the user who sent the follow request.
 * @param {number} receiverId - The ID of the user who received the follow request.
 * @returns {Promise<Follower>} A promise resolving to the created follower object.
 */

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

/**
 * Deletes a follow request by its ID.
 * 
 * @param {String} requestId The ID of the follow request to delete
 * @returns {Promise<FollowRequest | null>} The deleted follow request
 */
const deleteFollowRequest = async (requestId: number): Promise<FollowRequest | null> => {
    return await prisma.followRequest.delete({
        where: {
            id: requestId
        }
    })
}

/**
 * Remove a follower 
 * 
 * @param followerId The ID of the follower to delete
 * @param followedId The ID of the followed 
 * @returns The deleted follower object
 */
const deleteFollower = async (followerId: number, followedId: number) => {
    return await prisma.follower.delete({
        where: {
            followerId_followedId: {
                followerId,
                followedId
            }
        }
    })
}

export default {
    createFollowRequest,
    confirmFollowRequest,
    readUserById,
    deleteFollowRequest,
    deleteFollower
}