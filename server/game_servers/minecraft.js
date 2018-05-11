import Logger from "../modules/Logger";
import Config from "../config/Config";
import JWT from "jsonwebtoken";
import Permissions from "../config/constants/Permissions";
import Paths from "../config/constants/Paths";
import GameServerUcc from "../ucc/GameServerUcc";
import child_process from "child_process";

let spawn = child_process.spawn;

const getServer = async (io, socket) => {
    if (io.gameserver != null) {
        addSocketToListeningRoom(io.gameserver, socket);
    }
};

const stopServer = async (io, socket) => {
    let inUse = await GameServerUcc.getStateMinecraft();
    if (io.gameserver != null && inUse) {
        socket.emit('stdout', {
            data: "Stopping Minecraft Server..."
        });
        io.gameserver.stdin.write("stop\n");
    } else {
        socket.emit('stdout', {
            data: "Can't stop the Minecraft Server as no instance is currently running"
        });
    }
};

const startServer = async (io, socket) => {
    if (io.gameserver == null) {
        io.gameserver = spawn('/bin/bash', [Paths.GAME_SERVER_SCRIPTS + '/start_minecraft_server.sh']);

        socket.emit('stdout', {
            data: "The Minecraft server is starting on tcc.tircher.be:" + Config.MINECRAFT_PORT
        });


        io.gameserver.stdout.on('data', data => {
            io.to(Config.GAMESERVER_ROOM).emit('stdout', {
                data: data.toString()
            });
        });

        io.gameserver.stderr.on('data', data => {
            io.to(Config.GAMESERVER_ROOM).emit('stderr', {
                data: data.toString()
            });
        });

        io.gameserver.on('exit', () => {
            io.to(Config.GAMESERVER_ROOM).emit('stdout', {
                data: "The Minecraft server was stopped"
            });
            delete io.gameserver;
        });

    } else {
        socket.emit('stdout', {
            data: "The Minecraft server is already running on tcc.tircher.be:" + Config.MINECRAFT_PORT
        })
    }

};

const addSocketToListeningRoom = (socket) => {
    socket.join(Config.GAMESERVER_ROOM);
};

const authenticate = async (socket, token) => {
    let decodedToken = await JWT.decode(token, Config.COOKIE_SECRET);
    let jwtPerms = decodedToken.permissions;
    if (jwtPerms.includes(Permissions.MINECRAFT)) {
        socket.authenticated = true;
    } else {
        socket.authenticated = false;
    }
};

const initSocket = (io) => {
    io.on('connection', socket => {

        socket.on('authenticate', async (data) => {
            if (data.token != null) {
                await authenticate(socket, data.token);
                if (socket.authenticated) {
                    await getServer(io, socket);
                }
            }
        });

        socket.on('start', async () => {
            if (socket.authenticated) {
                await startServer(io, socket);
            }
        });

        socket.on('stop', async () => {
            if (socket.authenticated) {
                await stopServer(io);
            }
        });

    });
};

export default {initSocket}