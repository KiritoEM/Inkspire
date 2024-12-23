import { Server } from "http";
import { socketConfig } from "./config";
import { Socket } from "socket.io";
import userHandlers from "./handlers/userHandlers";
import socketMiddleware from "@/middlewares/socket";

const socket = async (server: Server) => {
    const { io } = socketConfig(server);

    // Namespaces
    const userNamespace = io.of("/user");

    // Namespaces middlewares
    userNamespace.use(socketMiddleware);

    const socketIdMap: { [userId: string]: string } = {};

    userNamespace.on("connection", (socket: Socket) => {
        const userId = socket.userId as string;

        if (userId) {
            socketIdMap[userId] = socket.id;
            console.log(`User namespace: client ${userId} connected. Socket ID: ${socket.id}`);
        }

        //handlers
        userHandlers(userNamespace, socket, socketIdMap);

        socket.on("disconnect", () => {
            if (userId && socketIdMap[userId]) {
                delete socketIdMap[userId];
                console.log(`User namespace: client ${userId} disconnected.`);
            }
        });
    });
};

export default socket;
