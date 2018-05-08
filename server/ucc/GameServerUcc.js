import checkPort from "tcp-port-used";
import Config from "../config/Config";

const getStateMinecraft = async () => {
    return await checkPort.check(Number(Config.MINECRAFT_PORT), '127.0.0.1');
};

const getStateTrackmania = async () => {
    return await checkPort.check(Number(Config.TRACKMANIA_PORT), '127.0.0.1');
};

const getStateConan = async () => {
    return await checkPort.check(Number(Config.CONAN_PORT),'127.0.0.1');
};

export default {getStateMinecraft, getStateTrackmania, getStateConan}