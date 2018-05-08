import checkPort from "tcp-port-used";
import Config from "../config/Config";
import child_process from "child_process";
import Paths from "../config/constants/Paths";
import Logger from "../modules/Logger";

let spawn = child_process.spawn;

const getStateMinecraft = async () => {
    return await checkPort.check(Number(Config.MINECRAFT_PORT), '127.0.0.1');
};

const getStateTrackmania = async () => {
    return await checkPort.check(Number(Config.TRACKMANIA_PORT), '127.0.0.1');
};

const getStateConan = async () => {
    return await checkPort.check(Number(Config.CONAN_PORT),'127.0.0.1');
};

const startMinecraftServer = () => {
    let mcServ = spawn('/bin/bash', [Paths.GAME_SERVER_SCRIPTS +'/start_minecraft_server.sh']);

    mcServ.stdout.on('data', data => {
        Logger.debug(data);
    });

    mcServ.stderr.on('data', data => {
        Logger.debug(data);
    });

    mcServ.on('exit', code => {
        Logger.debug("Minecraft server exited with code " + code.toString());
    });
};

export default {getStateMinecraft, getStateTrackmania, getStateConan, startMinecraftServer}