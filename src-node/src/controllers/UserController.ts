import { ERROR_CODE } from "@/helpers/constants";
import { sendErrorResponse } from "@/helpers/sendResponse";
import { Request, Response } from "express"

const SendFollowRequest = (req: Request, res: Response) => {
    const { toFollowedId } = req.params;
    const userId = req.user.id;

    if (!toFollowedId) {
        return sendErrorResponse(res, ERROR_CODE.NOT_FOUND, "No toFollowedId provided !!!");
    }
}

export default { SendFollowRequest }