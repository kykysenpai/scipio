import Logger from "../modules/Logger";
import Config from "../config/Config";
import JWT from "jsonwebtoken";
import Permissions from "../config/constants/Permissions";
import Paths from "../config/constants/Paths";
import GameServerUcc from "../ucc/GameServerUcc";
import child_process from "child_process";

let spawn = child_process.spawn;

const ROOM = 'authenticated';

const getServer = async (io, socket) => {
    if(io.gameserver != null){
        addSocketToListeningRoom(io.gameserver, socket);
    } else {
        await startServer(io, socket);
    }
};

const stopServer = async (io) => {
    if(io.gameserver != null){
        io.gameserver.stdin.write("stop\n");
    }
};

const startServer = async (io, socket) => {
    let inUse = await GameServerUcc.getStateMinecraft();
    if(inUse){
        Logger.debug("it looks like the server is already running");
        return;
    }

    io.gameserver = spawn('/bin/bash', [Paths.GAME_SERVER_SCRIPTS +'/start_minecraft_server.sh']);

    addSocketToListeningRoom(io.gameserver, socket);

    io.gameserver.stdout.on('data', data => {
        Logger.debug(data.toString());
        io.to(ROOM).emit('stdout', {
            data: data.toString()
        });
    });

    io.gameserver.stderr.on('data', data => {
        Logger.debug(data.toString());
        io.to(ROOM).emit('stderr', {
            data: data.toString()
        });
    });

    io.gameserver.stderr.on('exit', () => {
        Logger.debug("Exiting Minecraft server");
        io.to(ROOM).emit('exit', {
            data: "The Minecraft server was closed"
        });
    });
};

const addSocketToListeningRoom = (gameserver, socket) => {
    socket.join(ROOM);
};

const authenticate = async (socket, token) => {
    let decodedToken = await JWT.decode(token, Config.COOKIE_SECRET);
    let jwtPerms = decodedToken.permissions;
    if(jwtPerms.includes(Permissions.MINECRAFT)){
        socket.authenticated = true;
    } else {
        socket.authenticated = false;
    }
};

const initSocket = async (io) => {
    io.on('connection', socket => {

        socket.on('authenticate', async (data) => {
            if(data.token != null){
                await authenticate(socket, data.token);
            }
        });

        socket.on('start', async () => {
            if(socket.authenticated){
                await getServer(io, socket);
            }
        });

        socket.on('stop', async () => {
            if(socket.authenticated){
                await stopServer(io);
            }
        });

    });
};

export default {getServer, initSocket}