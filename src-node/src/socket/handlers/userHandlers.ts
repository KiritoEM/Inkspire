import UserServices from "@/services/UserServices";
import { Namespace, Socket } from "socket.io";

/**
 * Handles user socket events.
 *
 * @param {Namespace} namespace - The socket io namespace
 * @param {Socket} socket - The socket object
 * @param {Record<string, string>} socketIdMap - A map of user IDs to socket IDs
 */
const userHandlers = (namespace: Namespace<any>, socket: Socket, socketIdMap: { [userId: string]: string }) => {
    const sendFollowRequest = async (senderId: number, receivedId: number) => {
        const senderUser = await UserServices.readUserById(Number(senderId));

        namespace.to(socketIdMap[receivedId]).emit("user:send_request", JSON.stringify(senderUser));
    }

    const confirmFollowRequest = async (requestId: number) => {
        const follow_request = await UserServices.readFollower_requestById(Number(requestId));
        console.log(follow_request, socketIdMap[follow_request?.senderId as number]);

        namespace.to(socketIdMap[follow_request?.senderId as number]).emit("user:confirm_follow_request", JSON.stringify(follow_request?.receiver));
    }

    socket.on("user:send_follow_request", sendFollowRequest);
    socket.on("user:confirm_follow_request", confirmFollowRequest);
}

export default userHandlers;