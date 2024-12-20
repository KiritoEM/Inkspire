import { Namespace, Socket } from "socket.io";

const userHandlers = (io: Namespace<any>, socket: Socket) => {
    const sendRequest = (senderId: number, receivedId: number) => {
        io.to("").emit("");
    }

    socket.on("user:send_request", sendRequest);
}

export default userHandlers;