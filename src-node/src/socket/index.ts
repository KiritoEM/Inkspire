import { Server } from "http";
import { socketConfig } from "./config";
import { Socket } from "socket.io";
import userHandlers from "./handlers/userHandlers";

const socket = (server: Server) => {
    const { io } = socketConfig(server);

    //Namespaces
    const userNamespace = io.of("/user");
    const chatNamespace = io.of("/chat");

    userNamespace.on("connection", (socket: Socket) => {
        console.log("User namespace: client connected  !!!");

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
