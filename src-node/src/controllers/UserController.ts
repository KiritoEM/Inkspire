import { ERROR_CODE, SUCCESS_CODE } from "@/helpers/constants";
import { sendErrorResponse, sendResponse } from "@/helpers/sendResponse";
import UserServices from "@/services/UserServices";
import { Request, Response } from "express"

const SendFollowRequest = async (req: Request, res: Response) => {
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

export default { SendFollowRequest }