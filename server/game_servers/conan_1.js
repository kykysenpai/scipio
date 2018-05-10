import Logger from "../modules/Logger";
import Config from "../config/Config";
import JWT from "jsonwebtoken";
import Permissions from "../config/constants/Permissions";
import child_process from "child_process";
import GameServerUcc from "../ucc/GameServerUcc";
import HttpStatus from "../config/constants/HttpStatus";
import checkPort from "tcp-port-used";
import Paths from "../config/constants/Paths";

let spawn = child_process.spawn;

const getServer = async (io, socket) => {
    if(io.gameserver != null){
        addSocketToListeningRoom(io.gameserver, socket);
    }
};

const stopServer = async (io) => {
    if(io.gameserver != null){
        Logger.info("Stopping Trackmania Server...");
        io.gameserver.kill('SIGINT');
    } else {
        Logger.info("Can't stop the Trackmania Server as no instance is currently running");
    }
};

const startServer = async (io, socket) => {
    if(io.gameserver == null) {
        // io.gameserver = spawn('/bin/bash', [Paths.GAME_SERVER_SCRIPTS + '/start_conan_1_server.sh']);
        io.gameserver = spawn('/bin/echo', ['$USER']);

        socket.emit('stdout', {
            data: "The Conan_1 server is starting on tcc.tircher.be:" + Config.CONAN_PORT_1
        });

        addSocketToListeningRoom(io.gameserver, socket);

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
                data: "The Conan_1 server was stopped"
            });
            delete io.gameserver;
            Logger.info("The conan server is now closed");
        });
    } else {
        Logger.info("The Conan_1 couldn't start because another instance is already running");
        socket.emit('stdout', {
            data: "The Conan_1 server is already running on tcc.tircher.be:" + Config.CONAN_PORT_1
        })
    }
};

const addSocketToListeningRoom = (gameserver, socket) => {
    socket.join(Config.GAMESERVER_ROOM);
};

const authenticate = async (socket, token) => {
    let decodedToken = await JWT.decode(token, Config.COOKIE_SECRET);
    let jwtPerms = decodedToken.permissions;
    if(jwtPerms.includes(Permissions.CONAN)){
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

        socket.on('state', () => {
           socket.emit('state', io.gameserver != null);
        });

        socket.on('start', async () => {
            if(socket.authenticated){
                Logger.info("Starting Conan_1 Server...");
                await startServer(io, socket);
                Logger.info("Conan_1 Server started on tcc.tircher.be:" + Config.CONAN_PORT_1);
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