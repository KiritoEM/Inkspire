import UserServices from "@/services/UserServices";
import { Namespace, Socket } from "socket.io";

const userHandlers = (io: Namespace<any>, socket: Socket, socketIdMap: { [userId: string]: string }) => {
    const sendRequest = async (senderId: number, receivedId: number) => {
        const senderUser = await UserServices.readUserById(senderId);

        io.to(socketIdMap[receivedId]).emit("user:send_request", JSON.stringify(senderUser));
    }

    socket.on("user:send_request", sendRequest);
}

export default userHandlers;