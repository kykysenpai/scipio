import Logger from "../modules/Logger";
import Config from "../config/Config";
import JWT from "jsonwebtoken";
import Permissions from "../config/constants/Permissions";
import child_process from "child_process";

let spawn = child_process.spawn;

const getServer = async (io, socket) => {
    if(io.gameserver != null){
        addSocketToListeningRoom(io.gameserver, socket);
    }
};

const addSocketToListeningRoom = (gameserver, socket) => {
    socket.join(Config.GAMESERVER_ROOM);
};

const authenticate = async (socket, token) => {
    let decodedToken = await JWT.decode(token, Config.COOKIE_SECRET);
    let jwtPerms = decodedToken.permissions;
    if(jwtPerms.includes(Permissions.TRACKMANIA)){
        socket.authenticated = true;
    } else {
        socket.authenticated = false;
    }
};

const initSocket = (io) => {
    io.on('connection', socket => {

        socket.on('authenticate', async (data) => {
            if(data.token != null){
                await authenticate(socket, data.token);
                if(socket.authenticated){
                    await getServer(io, socket);
                }
            }
        });

        socket.on('start', async () => {
            if(socket.authenticated){
                Logger.info("Starting Trackmania Server...");
                await startServer(io, socket);
                Logger.info("Trackmania Server started on tcc.tircher.be:" + Config.TRACKMANIA_PORT);
            }
        });

        socket.on('stop', async () => {
            if(socket.authenticated){
                await stopServer(io);
            }
        });

    });
};

export default {initSocket}