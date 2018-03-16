import HttpStatus from "../config/constants/HttpStatus";
import Paths from "../config/constants/Paths";

const index = (req, res) => {
    res.status(HttpStatus.OK).sendFile(Paths.VIEWS_SUCCESS + '/index.html');
};

const profile = (req, res) => {
    res.status(HttpStatus.OK).sendFile(Paths.VIEWS_SUCCESS + '/profile.html');
};

export default {index, profile}
