import { NextFunction } from "express";
import { Socket } from "socket.io";

const socketMiddleware = (socket: Socket, next: NextFunction) => {
    try {
        const userId = socket.handshake.auth.userId;
        socket.userId = userId;
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
};

export default socketMiddleware;
