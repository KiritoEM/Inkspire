import { ERROR_CODE, SUCCESS_CODE } from "@/helpers/constants";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import UserServices from "@/services/UserServices";
import { Request, Response } from "express"

/**
 * Send a follow request to user
 *
 * @param {Request} req - The Request object
 * @param {Response} res - The Response object
 *
 * @returns {Promise<Response>} A response object containing a the follow_request 
 */
const sendFollowRequest = async (req: Request, res: Response): Promise<Response> => {
    const { receiverId } = req.params;
    const userId = req.user.id;

    if (!receiverId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No receiverId provided !!!");
    }

    if (parseInt(receiverId) === userId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "receiverId and senderId must be different !!!");
    }

    const followRequest = await UserServices.createFollowRequest(userId as number, parseInt(receiverId));

    if (!followRequest) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "Error occurred while sending Follow request !!!");
    }

    return sendResponse(res, SUCCESS_CODE.CREATED, "Follow request sent successfully!", { follow_request: followRequest });
}

/**
 * Accept a follow request
 *
 * @param {Request} req - The Request object
 * @param {Response} res - The Response object
 *
 * @returns {Promise<Response>} A response object containing the follower
 */
const acceptFollowRequest = async (req: Request, res: Response): Promise<Response> => {
    const { requestId, senderId } = req.params;
    const userId = req.user.id;

    if (!senderId || !requestId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No senderId or requestId provided !!!");
    }

    if (parseInt(senderId) === userId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "receiverId and senderId must be different !!!");
    }

    const follower = await UserServices.confirmFollowRequest(parseInt(requestId), parseInt(senderId), userId as number);

    if (!follower) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "Error occurred while confirming Follow request !!!");
    }

    return sendResponse(res, SUCCESS_CODE.ACCEPTED, "Follow request confirmed successfully!", { follower });
}

/**
 * Get a user by its id
 *
 * @param {Request} req - The Request object
 * @param {Response} res - The Response object
 *
 * @returns {Promise<Response>} A response object containing the user
 */
const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;

    if (!userId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No userId provided !!!");
    }

    const user = await UserServices.readUserById(parseInt(userId));

    if (!user) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No user found with this id !!!");
    }

    return sendResponse(res, SUCCESS_CODE.OK, "user fetched successfully!", { user });
}

const removeFollowRequest = async (req: Request, res: Response) => {
    const { requestId } = req.params;

    if (!requestId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No requestId provided !!!");
    }

    const followRequest = await UserServices.deleteFollowRequest(parseInt(requestId));

    if (!followRequest) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "An error was occured when  deleting follow request !!!");
    }

    return sendResponse(res, SUCCESS_CODE.OK, "follow request removed successfully!", { followRequest });
}


/**
 * Remove a follower
 *
 * @param {Request} req - The Request object
 * @param {Response} res - The Response object
 *
 * @returns {Promise<Response>} A response object containing the deleted follower
 */
const removeFollower = async (req: Request, res: Response) => {
    const { followerId } = req.params;
    const userId = req.user.id;

    if (!followerId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No userId provided !!!");
    }

    const follower = await UserServices.deleteFollower(parseInt(followerId), userId as number);

    if (!follower) {
        return sendErrorResponse(res, ERROR_CODE.BAD_REQUEST, "An error was occured when  deleting follower !!!");
    }

    return sendResponse(res, SUCCESS_CODE.OK, "follower retired successfully!", { follower });
}

export default {
    sendFollowRequest,
    acceptFollowRequest,
    getUserById,
    removeFollowRequest,
    removeFollower
}