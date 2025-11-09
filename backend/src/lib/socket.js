
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

export function getReceiverSocketId(receiverId) {
    return userSocketMaps[receiverId];
}

const userSocketMaps = {}

io.on('connection', (socket) => {
    // here socket represents the user that just connected
    console.log('A user connected', socket.id);

    const { userId } = socket.handshake.query;
    if (userId) {
        userSocketMaps[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMaps));

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);

        delete userSocketMaps[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMaps));

    });
});

export { app, httpServer, io };

