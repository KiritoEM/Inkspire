import { Server } from "http";
import { socketConfig } from "./config";
import { Socket } from "socket.io";
import userHandlers from "./handlers/userHandlers";
import socketMiddleware from "@/middlewares/socket";

const socket = async (server: Server) => {
    const { io } = socketConfig(server);

    //Namespaces
    const userNamespace = io.of("/user");
    const chatNamespace = io.of("/chat");

    console.log("=============== Socket middleware");
    userNamespace.use(socketMiddleware);
    console.log("Socket middleware =============== ");

    userNamespace.on("connection", (socket: Socket) => {
        console.log(`User namespace: client ${socket.userId} connected  !!!`);

        let socketIdMap: { [key: string]: string } = {};
        socketIdMap[socket.userId as unknown as string] = socket.id;

        if (socketIdMap) {
            console.log("socketMap", socketIdMap);
        }

        //handlers
        userHandlers(userNamespace, socket);

        socket.on("disconnect", () => {
            console.log("User namespace: client disconnected  !!!");
        });
    })

};

export default socket;
