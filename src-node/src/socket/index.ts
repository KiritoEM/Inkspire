import { Server } from "http";
import { socketConfig } from "./config";
import { Socket } from "socket.io";
import registerUserHandlers from "./handlers/userHandlers";

const socket = (server: Server) => {
    const { io } = socketConfig(server);

    const onConnection = (socket: Socket) => {
        console.log("User connected !!!");

        //handlers
        registerUserHandlers(io, socket);


        socket.on("disconnect", () => {
            console.log("User disconnected !!!!");
        });
    }

    io.on("connection", onConnection);
};

export default socket;
