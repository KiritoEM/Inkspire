import { DefaultEventsMap, ExtendedError, Socket } from "socket.io";

const socketMiddleware = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: (err?: ExtendedError | undefined) => void) => {
    try {
        const userId = socket.handshake.query.userId;
        socket.userId = userId?.toString();
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
};

export default socketMiddleware;
